# Docker 部署人大金仓 KingbaseES：镜像导入、PG 模式启动与连接验证

> 摘要：本文以 KingbaseES V009R001C010B0004 x86_64 Docker 镜像为例，介绍 tar 镜像导入、按下载时间打标签、以 PostgreSQL 兼容模式启动容器，以及端口和数据库连接验证。示例用于测试环境，生产部署前应结合授权、数据持久化和安全要求调整。

在本地测试人大金仓时，使用 Docker 可以把镜像导入、启动参数和连接方式固定下来。本文记录一套实际运行过的流程，并说明一个容易忽略的细节：镜像中的测试数据库名是小写 `test`，直接照抄某些示例中的大写 `TEST` 会提示数据库不存在。

## 一、准备镜像

先从人大金仓官方渠道获取与服务器架构匹配的 Docker 镜像包，并确认镜像及 License 的使用符合对应授权要求。本文使用的文件名为：

```text
KingbaseES_V009R001C010B0004_x86_64_Docker.tar
```

将镜像包上传到 Linux 服务器。下面的 `deploy@192.0.2.10` 是示例 SSH 地址，使用时替换成自己的服务器账号和地址：

```bash
scp KingbaseES_V009R001C010B0004_x86_64_Docker.tar \
  deploy@192.0.2.10:/tmp/
```

登录服务器后加载镜像：

```bash
docker load -i /tmp/KingbaseES_V009R001C010B0004_x86_64_Docker.tar
docker images
```

加载后可以看到镜像自带的标签。本次镜像标签为：

```text
kingbase_v009r001c010b0004_single_x86:v1
```

为了保留版本和下载时间信息，可以再打一个便于识别的标签：

```bash
SOURCE_IMAGE=kingbase_v009r001c010b0004_single_x86:v1
DOWNLOAD_TAG="v009r001c010b0004-$(date +%Y%m%d-%H%M%S)"
IMAGE="kingbase:${DOWNLOAD_TAG}"

docker tag "$SOURCE_IMAGE" "$IMAGE"
docker image inspect "$IMAGE" --format '{{.Architecture}} {{.Id}}'
printf '使用镜像：%s\n' "$IMAGE"
```

例如，某次下载可标记为 `kingbase:v009r001c010b0004-20261013-153751`。镜像标签只是本地名称，不会改变镜像内容；保留原始标签也有助于核对来源。

## 二、确定端口映射

`docker run -p` 的格式是 `宿主机端口:容器端口`。Kingbase 容器内部监听 `54321`。如果宿主机的 `54321` 已被另一个 PostgreSQL 服务占用，可以把 Kingbase 映射到宿主机 `54322`：

```text
宿主机 54322 -> 容器 54321
```

这样外部客户端连接 `服务器地址:54322`，容器内部仍使用端口 `54321`。端口号可以按服务器实际占用情况调整；同一宿主机上不能让两个容器同时绑定相同的 IP 和端口。

## 三、以 PostgreSQL 兼容模式启动

镜像支持通过环境变量设置初始用户、密码和数据库模式。下面的命令以 `postgres` 为用户，使用 `pg` 模式，并让容器启动时运行数据库：

```bash
read -rsp 'Kingbase 数据库密码: ' KINGBASE_DB_PASSWORD
printf '\n'

docker run -tid \
  --name KingBase \
  --restart=always \
  -p 54322:54321 \
  -e NEED_START=yes \
  -e DB_USER=postgres \
  -e DB_PASSWORD="$KINGBASE_DB_PASSWORD" \
  -e DB_MODE=pg \
  "$IMAGE" \
  /bin/bash

unset KINGBASE_DB_PASSWORD
```

这里没有添加 `--privileged`；上述 V009 镜像测试实例在非特权模式下可以正常运行。`NEED_START=yes` 表示进入容器后启动数据库，`DB_MODE=pg` 表示启用 PostgreSQL 兼容模式。镜像还支持 `oracle` 和 `mysql` 模式，具体行为应以所用镜像版本的说明为准。

密码没有写进命令历史，但通过环境变量传入的密码仍可能被有 Docker 管理权限的用户从容器配置中读取。正式环境应使用符合组织要求的密钥管理方式，并避免复用测试密码。

## 四、检查容器状态

容器启动后先看运行状态、端口映射和日志：

```bash
docker ps --filter name=KingBase
docker port KingBase 54321/tcp
docker logs --tail 100 KingBase
```

还可以检查镜像、端口和挂载情况：

```bash
docker inspect --format 'status={{.State.Status}} image={{.Config.Image}} ports={{json .HostConfig.PortBindings}} mounts={{json .Mounts}}' KingBase
```

如果日志没有显示数据库已就绪，先根据容器日志排查启动错误，再测试客户端连接。

## 五、连接数据库

可以直接在容器内使用镜像提供的 `ksql` 客户端：

```bash
docker exec -it KingBase \
  /home/kingbase/install/kingbase/bin/ksql \
  -h 127.0.0.1 -p 54321 -U postgres -d test
```

也可以从服务器外部使用 PostgreSQL 协议兼容客户端连接：

```bash
psql -h 192.0.2.10 -p 54322 -U postgres -d test
```

将示例地址 `192.0.2.10` 替换成自己的服务器地址。

按提示输入数据库密码。使用 DBeaver 等图形客户端时，连接信息对应填写为：

| 配置项 | 示例 |
|---|---|
| 主机 | 服务器地址 |
| 端口 | `54322` |
| 数据库 | `test` |
| 用户 | `postgres` |

数据库名需要与服务器中的实际名称完全一致。本次 V009 镜像初始化后可见的数据库包括 `kingbase`、`security`、`template0`、`template1` 和小写的 `test`。参考文章里的 `TEST` 是大写写法；连接时应使用实际存在的 `test`。可以连接到 `template1` 后查询数据库列表：

```sql
SELECT datname FROM pg_database ORDER BY datname;
```

如需为应用创建单独的数据库，可在具备相应权限的连接中执行：

```sql
CREATE DATABASE app_db OWNER postgres;
```

`postgres` 在本次测试镜像中具备超级用户权限。生产应用通常应使用专用角色和必要的最小权限，而不是直接使用超级用户。

## 六、日志、启停与配置

查看容器日志：

```bash
docker logs KingBase
```

进入容器：

```bash
docker exec -it KingBase /bin/bash
```

在容器中可以用 `sys_ctl` 检查数据库状态：

```bash
/home/kingbase/install/kingbase/bin/sys_ctl \
  -D /home/kingbase/userdata/data status
```

配置文件和数据位于容器内 `/home/kingbase/userdata/data` 目录。更新配置后，可按镜像文档使用 `sys_ctl reload` 重新加载；变更前应备份并确认参数适用于当前版本。

## 七、测试部署的数据持久化

本文使用的临时测试容器没有挂载宿主机数据卷，数据库数据保存在容器可写层。重启容器不会自动清空数据，但删除容器会丢失容器内的数据和配置。

如果需要在容器重建后保留数据，可按镜像目录要求增加数据卷，例如：

```bash
-v /data/kingbase/data:/home/kingbase/userdata/data
```

实际使用前，应确认宿主机目录权限、备份和恢复方案，并参考对应版本的官方文档。License 文件和配置文件是否需要单独持久化，也应按具体镜像和授权方式确认。

## 八、常见问题

### 宿主机端口已被占用

调整 `-p` 左侧的宿主机端口，例如使用 `-p 54322:54321`。客户端也要连接新的宿主机端口，不能仍然连接容器内部端口 `54321`。

### 提示数据库不存在

先查询 `pg_database` 确认数据库名。数据库名大小写必须匹配；本文测试镜像中实际存在的是小写 `test`，不是大写 `TEST`。

### 登录失败

检查连接的服务器地址、宿主机端口、用户名、数据库名和密码，并结合 `docker logs KingBase` 查看服务端日志。不要把密码写入公开文章、脚本仓库或命令行历史。

## 参考资料

1. 浅木·先生：《Docker部署数据库--人大金仓（kingbase）》，CSDN，<https://blog.csdn.net/kft1314/article/details/138566509>。本文的整体流程参考该文，并针对 V009 镜像、端口占用和实际数据库名作了调整。
2. 人大金仓官方文档：《Docker 安装》，<https://help.kingbase.com.cn/v8/install-updata/install-docker/install-docker-3.html#id2>。镜像启动参数及数据目录以实际使用版本的官方说明为准。
