---
title: 阅读器
lang: zh-CN
date: 2023-07-22
publish: true
author: azrng
category:
    - soft
tag:
    - soft
---

## Koodo Reader

Koodo Reader 是一个开源免费的电子书阅读器，支持多达15种主流电子书格式， 内置笔记、高亮、翻译功能，助力高效书籍阅读和学习。

官网：https://koodo.960960.xyz/zh

### 功能特色

- 支持多达15种电子书格式：
  - EPUB (**.epub**)
  - 扫描文档 (**.pdf**, **.djvu**)
  - Kindle (**.azw3**, **.mobi**)
  - 纯文本 (**.txt**)
  - 漫画 (**.cbr**, **.cbz**, **.cbt**)
  - 富文本 (**.md**, **.docx**, **.rtf**)
  - FB2 (**.fb2**)
  - 超文本 (**.html**, **.xml**, **.xhtml**, **.htm**)
- 跨平台支持 **[Windows]**，**[macOS]**，**[Linux]** 和 **[网页版]**
- 自定义源文件夹，利用 OneDrive、百度网盘、iCloud、Dropbox 等进行多设备同步
- **阅读界面**支持双页模式，单页模式和滚动模式
- 拥有听书功能，翻译功能，触控屏支持，也支持批量导入图书
- 支持目录，书签，笔记，高亮，书架，标签
- 支持自定义字体，字体大小，行间距，段落间距，阅读背景色，文字颜色，屏幕亮度，文字下划线、斜体、文字阴影、字体粗细
- 支持黑夜模式和主题色设置

## 电子图书馆

### Calibre

Calibre是一款开源的电子书管理软件，它提供了一套功能丰富的工具和界面，用于创建、编辑、组织和阅读电子书。支持五大操作系统：

- Windows
- Linux
- MacOs
- Android
- iOS（苹果手机和iPad）

下载地址：https://github.com/kovidgoyal/calibre/releases



Calibre可以管理各种格式的电子书，包括EPUB、MOBI、PDF等。它可以帮助用户将电子书文件转换为不同的格式，以适应不同的设备和阅读器。同时，Calibre还提供了一系列编辑工具，可以对电子书进行元数据编辑、封面设计、章节重排等操作。

除了电子书的管理和编辑，Calibre还具有强大的图书库管理功能。用户可以使用Calibre来组织和分类电子书，添加标签和注释，进行搜索和过滤等操作，以便更好地管理自己的阅读材料。

此外，Calibre还内置了一个功能齐全的电子书阅读器，用户可以直接在软件中阅读电子书，调整字体、布局和阅读设置等。



Calibre-Web是一个基于Web的开源电子书库管理界面，它是Calibre电子书管理软件的一个衍生项目。Calibre-Web提供了一个漂亮的Web界面，用于管理和浏览您的电子书库。它可以让您从任何设备（如电脑、平板电脑、手机等）通过Web浏览器来访问和管理您的电子书。

通过Calibre-Web，您可以执行以下操作：

1. 上传和添加电子书：您可以通过Web界面上传电子书文件，并将其添加到您的电子书库中。
2. 浏览和搜索电子书：您可以使用Calibre-Web的界面来浏览您的电子书库，按类别、作者、标签等进行过滤和搜索。
3. 阅读电子书：Calibre-Web提供了一个内置的电子书阅读器，您可以直接在Web界面中打开和阅读电子书。
4. 编辑和管理元数据：您可以使用Calibre-Web来编辑电子书的元数据，如标题、作者、封面等信息。您还可以为电子书添加标签、评分等。
5. 共享电子书：Calibre-Web支持用户之间的共享，您可以设置不同用户的访问权限，以便与朋友、家人或团队成员分享您的电子书。



可以通过命令行、安装包、docker-compose等方式进行安装，例如参考docker-compose部署

文档：https://linuxserver.watercalmx.com/images/docker-calibre-web.html

```yaml
version: '3'

services:
  calibre-web: # 基于Web的开源电子书库管理界面
    container_name: calibre-web
    image: linuxserver/calibre-web
    environment:
      - PUID=1000 # 用户的uid
      - PGID=1000 # 用户的gid
      - TZ=Asia/Shanghai
      - DOCKER_MODS=linuxserver/mods:universal-calibre #optional
      - OAUTHLIB_RELAX_TOKEN_SCOPE=1 #optional
    volumes:
      - ./data:/config # 配置文件所在路径
      #- [此处设置为自己的书库目录]:/books  # 数据库所在位置
    ports:
      - 8083:8083 # web管理界面 默认管理员账号密码：admin/admin123
    restart: always
```

然后就可以通过浏览器访问http://localhost:8083/进行查看，账号密码：admin/admin123



参考资料：https://mp.weixin.qq.com/s/obq7iDqRN0rqdhF03TAQ5A

## 书籍网站

[书享家综合书籍推荐网站](https://www.shuxiangjia.cn/)  [owlook小说网](https://owlook.com.cn/)    [booklink](https://booklink.me/) [PDF之家](https://homeofpdf.com/)

[Manning](https://www.manning.com/)

### Z-Library

**Z-Library**（缩写为**z-lib**，以前称为**BookFinder**）是Library Genesis的镜像，一个影子图书馆项目，用于对学术期刊文章、学术文本和大众感兴趣的书籍（其中一些是盗版的）进行文件共享访问）。它的大部分书籍来自Library Genesis，而其中一些则由个人直接上传到其网站。它号称是"世界上最大的电子书图书馆"，以及"世界上最大的科学文章商店"，目前已经超1000万册电子书。

但因为众所周知的原因，最近官方站点都无法访问，所以需要去网上找镜像站。

zlibrary：https://www.tboxn.com/560.html

[https://zh.z-lib.gs/ ](https://zh.z-lib.gs/)


### 孔夫子旧书网

旧书、新书等实体书网站
地址：https://www.kongfz.com/
