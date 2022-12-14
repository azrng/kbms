---
title: EFCore-增删改查
lang: zh-CN
date: 2021-08-25
publish: true
author: azrng
isOriginal: true
category:
 - dotNet
tag:
 - db
 - orm
 - efcore
---
# 1. 连接数据库

通过依赖注入配置应用程序，通过startup类的ConfigureService方法中的AddDbContext将EFCore添加到依赖注入容器

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();

    services.AddDbContext<OpenDbContext>(
        options => options.UseMySql(Configuration["DbConfig:Mysql:ConnectionString"]);
}
```

将名为 OpenDbContext的 DbContext 子类注册到依赖注入容器的Scope生命周期。上下文配置为使用MySQL数据库提供程序，并从配置中读取数据库连接字符串。



OpenDbContext类必须公开具有 DbContextOptions&lt;OpenDbContext&gt;参数的公共构造函数。 这是将 AddDbContext 的上下文配置传递到 DbContext 的方式。

```
    public class OpenDbContext : DbContext
    {
        public OpenDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Score> Scores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //另一种配置连接数据库的方式
            //optionsBuilder.UseMySql("连接数据库", ServerVersion.AutoDetect("连接数据库字符串"));
            
            //显示敏感数据日志
            optionsBuilder.EnableSensitiveDataLogging(true);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //属性配置
            //modelBuilder.Entity<User>().Property(t => t.Account).IsRequired().HasMaxLength(20).HasComment("帐号");
            //种子数据设置
            //modelBuilder.Entity<User>().HasData(new User { Account="种子"});
            
            // 添加etc
            modelBuilder.ApplyConfiguration(new UserInfoETC());

            //通过反射批量添加etc的操作
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }
    }
```

然后将OpenDbContext通过构造函数注入的方式注入到应用程序的控制器或者其他服务中使用。

关于连接数据库可以参考另一个文章： [.Net之生成数据库全流程](https://mp.weixin.qq.com/s/_jfMwvewRNkAVwL4pfvLCA)

# 2. 操作数据库

```
    context.Database.EnsureDeleted();//删除数据库，如果存在，如果没有权限，则引发异常
    context.Database.EnsureCreated();//如果数据库不存在，创建数据库并初始化数据库架构，如果存在任何表，则不会初始化架构
    context.Database.Migrate();//根据迁移文件，迁移数据库
```

# 3. 查询操作

## 3.1 基础查询

```
db.Set<UserInfor>().ToList();

//查询表达式
var account = (from u in _context.Users
                    where u.Id == id
                    select u.Account
                    ).ToList();

//查询单个
_context.Movie.FirstOrDefaultAsync(m => m.ID == id); 
_context.Movie.FindAsync(id); 

//查询指定列  如果不存在数据返回空对象，而不是null
_context.Set<User>().AsNoTracking().Where(t=>t.Id=="11").Select(t => new { t.Account, t.PassWord }).FirstOrDefaultAsync();
//查询指定列 如果不存在数据返回空字符串，而不是null
 var session = await _context.Set<User>().Where(t=>t.Id =="11").Select(t => t.Name).FirstOrDefaultAsync().ConfigureAwait(false);

_context.Users.OrderBy(ty => ty.IsValid).Where(t => t.Id == "1407875772521123840").FirstOrDefaultAsync();
// 在EFCore中不论是先where还是先order，生成的SQL脚本都是先where再order的

// 预先加载查询
var blogs = context.Blogs.Include(blog => blog.Posts).ToList();
// 包含多个层级的查询
var blogs = context.Blogs.Include(blog => blog.Posts).ThenInclude(post => post.Author).ToList();
```

SingleOrDefaultAsync 与FirstOrDefaultAsync

如果有多个实体符合筛选部分， SingleOrDefaultAsync 将引发异常。

如果有多个实体符合筛选部分， FirstOrDefaultAsync 不引发异常。



FindAsync

在大部分基架代码中，FindAsync 可用于替代 FirstOrDefaultAsync ，查找具有主键 (PK) 的实体。 如果具有 PK 的实体正在由上下文跟踪，会返回该实体且不向 DB 发出请求。

```
测试结果
var entity = _context.Users.Where(t => t.Id == "55555").Select(t => new { t.Account }).FirstOrDefault();//null
var entity2 = _context.Users.Where(t => t.Id == "55555").Select(t => t.Account).FirstOrDefault();//null
var enetit3 = _context.Users.Where(t => t.Id == "55555").Select(t => new user { Name = t.Account }).FirstOrDefault();//null
var entity4 = _context.Users.FirstOrDefault(t => t.Id == "55555");//null
var entity5 = _context.Users.Select(t => new user { Name = t.Account }).FirstOrDefault(t => t.Name == "444");//null
```

## 3.2 跟踪和非跟踪查询

跟踪行为决定了EFCore是否将有些实体的信息保存在其更改更跟踪器中。如果已跟踪某个实体，则该实体中检测到的任何更改都会在SaveChanges()时候保存到数据库，

不跟踪没有主键的实体类型。

```
# 跟踪查询
_context.Set<User>().ToListAsync();

# 非跟踪查询
_context.Set<User>().AsNoTracking().ToListAsync();
```

默认是跟踪查询

## 3.3 条件查询

### 3.3.1 不支持异步方案

```
			Func<User, bool> express = x => true;		
            if (!string.IsNullOrWhiteSpace(dto.Data))
            {
                express = x => x.Mobile == dto.Data;
            }
            string userid = "";
            if (!string.IsNullOrWhiteSpace(userid))
            {
                express = x => x.UserId == userid;
            }
            var bbb = _dbContext.Set<User>().Where(express).FirstOrDefault();
```

### 3.3.2 支持异步方案

```
			Expression<Func<User, bool>> express = x => true;
            if (!string.IsNullOrWhiteSpace(dto.Data))
            {
                express = x => x.Mobile == dto.Data;
            }
            var bbb = await _dbContext.Set<User>().Where(express).ToListAsync();
```

## 3.4 原生SQL查询

可使用 FromSqlRaw 扩展方法基于原始 SQL 查询开始 LINQ 查询。 FromSqlRaw 只能在直接位于 DbSet<> 上的查询根上使用。

### 3.4.1 基本原生SQL查询

```
var blogs = context.Blogs
    .FromSqlRaw("select * from user")
    .ToList();

// 执行存储过程
var blogs = context.Blogs
    .FromSqlRaw("EXECUTE dbo.GetMostPopularBlogs")
    .ToList();
```

2.x里面使用FromSql，在3.x里面使用FromSqlRow方法

### 3.4.2 参数化查询

#### 3.4.2.1 SQL注入

首先我们编写一个简单的SQL注入示例，比如就注入我们根据ID查询的语句，输入ID为：ididid' or '1'='1

```
    var strSql = string.Format("select * from user where Id='{0}'", "ididid' or '1'='1");
    var query = await _context.Set<User>().FromSqlRaw(strSql).ToListAsync();
    Console.WriteLine(JsonConvert.SerializeObject(query));
```

生成语句

```
      select * from user where Id='ididid' or '1'='1'
[{"Account":"张三","PassWord":"123456","CreateTime":"2021-05-20T22:53:44.778101","IsValid":false,"Id":"1395392302788120576"},{"Account":"李四","PassWord":"123456","CreateTime":"2021-05-20T22:53:44.849376","IsValid":false,"Id":"1395392303090110464"},{"Account":"王五","PassWord":"123456","CreateTime":"2021-05-20T22:53:44.849425","IsValid":false,"Id":"1395392303090110467"}]
```

#### 3.4.2.2 FromSqlRaw参数化

通过参数化查询，防止SQL注入问题

```
    //sql语句参数化查询，防止SQL注入	
    var strSql = "select * from user where Id=@id";
    var parameter = new MySqlParameter[] {
        new MySqlParameter("@id","1395392302788120576"),
    };
    var query = await _context.Set<User>().FromSqlRaw(strSql, parameter).ToListAsync();
```

或者

```
    var strSql = "select * from user where Id={0}";
    var query = await _context.Set<User>().FromSqlRaw(strSql, "1395392302788120576").ToListAsync();
    Console.WriteLine(JsonConvert.SerializeObject(query));
	
	// 生成SQL
    select * from user where Id=@p0
    [{"Account":"张三","PassWord":"123456","CreateTime":"2021-05-20T22:53:44.778101","IsValid":false,"Id":"1395392302788120576"}]
```

通过占位符形式提供额外的参数，看上去类似于String.Format语法，但是提供的值包装在DbParameter中。可以防止SQL注入

#### 3.4.2.3 FromSqlInterpolated参数化

FromSqlInterpolated 类似于 FromSqlRaw，但你可以借助它使用字符串内插语法。 与 FromSqlRaw 一样，FromSqlInterpolated 只能在查询根上使用，并且都可以防止SQL注入。

```
    var query = await _context.Set<User>().FromSqlInterpolated($"select * from user where Id={"1395392302788120576"}").ToListAsync();
    Console.WriteLine(JsonConvert.SerializeObject(query));
```

生成SQL

```
      select * from user where Id=@p0
[{"Account":"张三","PassWord":"123456","CreateTime":"2021-05-20T22:53:44.778101","IsValid":false,"Id":"1395392302788120576"}]
```

### 3.4.3 限制

- SQL查询必须返回实体类型的所有属性的数据。
- 结果集中的列明必须与属性映射到的列名称匹配。

- SQL查询不能包含关联数据， 但是，在许多情况下你可以在查询后面紧跟着使用 `Include` 方法以返回关联数据（请参阅[包含关联数据](https://docs.microsoft.com/zh-cn/ef/core/querying/raw-sql#including-related-data)）。

参考文档：https://docs.microsoft.com/zh-cn/ef/core/querying/raw-sql

## 3.5 复杂查询

数据如下：

用户表(user)

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/1621562425951-13836b1a-66db-46a9-9f39-7fb3278d879c.png)

用户成绩表(score)

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/1621562455217-109ca102-03dc-41b3-9cc2-7c3e0a12856f.png)

描述：包含三个用户，其中两个用户在成绩表都有语文和数学的数据。

### 3.5.1 内连接

内连接：分为隐式内连接和显式内连接(写法不同，结果相同)

#### 3.5.1.1 Linq查询表达式

##### 显式内连接：join-in-on拼接

```
    var list = (from u in _context.Users
                join sc in _context.Scores on u.Id equals sc.UserId
                where sc.CourseName == "语文"
                select new
                {
                    u.Account,
                    u.PassWord,
                    sc.CourseName,
                    sc.Grade
                }).ToList();
	Console.WriteLine(JsonConvert.SerializeObject(list));
```

记得引用：System.Linq  否则提示：未找到源类型“DbSet&lt;User&gt;”的查询模式的实现，未找到join

生成SQL

```
      SELECT `u`.`Account`, `u`.`PassWord`, `s`.`CourseName`, `s`.`Grade`
      FROM `user` AS `u`
      INNER JOIN `score` AS `s` ON `u`.`Id` = `s`.`UserId`
      WHERE `s`.`CourseName` = '语文'
```

结果

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/1621562254206-ca4cde94-2b2d-4e81-94fd-aabf09bc198d.png)

三表联合查询

```
var templateFieldList = await (from template in _conclusionTemplateReq.EntitiesAsNoTracking.Where(t =>
        t.Isdefault && t.TenantId == CurrentUser.TenantId)
    join templateField in _templateFieldMappingRep.EntitiesAsNoTracking on template.CluTemplateId equals
        templateField.CluTemplateId
    join field in _conclusionTemplateFieldRep.EntitiesAsNoTracking.Where(t => t.Isdefault) on templateField
        .CluFieldId equals field.CluFieldId
    select new ChatConclusionTemplateFieldMapping(newTemplateId, templateField.CluFieldId,
        templateField.Sort)).ToArrayAsync().ConfigureAwait(false);
```

##### 隐式内连接：多个from并联拼接

```
    var list = (from u in _context.Users
                from sc in _context.Scores
                where u.Id == sc.UserId && sc.CourseName == "语文"
                select new
                {
                    u.Account,
                    u.PassWord,
                    sc.CourseName,
                    sc.Grade
                }).ToList();
    Console.WriteLine(JsonConvert.SerializeObject(list));
```

生成SQL

```
      SELECT `u`.`Account`, `u`.`PassWord`, `s`.`CourseName`, `s`.`Grade`
      FROM `user` AS `u`
      CROSS JOIN `score` AS `s`
      WHERE (`u`.`Id` = `s`.`UserId`) AND (`s`.`CourseName` = '语文')
```

结果

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/1621562264762-9127dd6f-a5bc-473f-bbc1-6547657eb5b5.png)

#### 3.5.1.2 Linq标准查询运算符

```
    var list = _context.Users.Where(t => t.Account != null)
        .Join(_context.Scores.Where(sc => sc.CourseName == "语文"), u => u.Id, sc => sc.UserId, (u, sc) => new
        {
            u.Account,
            u.PassWord,
            sc.CourseName,
            sc.Grade
        }).ToList();
    Console.WriteLine(JsonConvert.SerializeObject(list));
```

生成SQL

```
      # 不加查询课程
	    SELECT `u`.`Account`, `u`.`PassWord`, `s`.`CourseName`, `s`.`Grade`
      FROM `user` AS `u`
      INNER JOIN `score` AS `s` ON `u`.`Id` = `s`.`UserId`
      
      # 查询课程
      SELECT `u`.`Account`, `u`.`PassWord`, `t`.`CourseName`, `t`.`Grade`
      FROM `user` AS `u`
      INNER JOIN (
          SELECT `s`.`CourseName`, `s`.`Grade`, `s`.`UserId`
          FROM `score` AS `s`
          WHERE `s`.`CourseName` = '语文'
      ) AS `t` ON `u`.`Id` = `t`.`UserId`
```

结果

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/1621564709433-98fbb56e-66e0-4505-b414-b12e9fa5d53b.png)

### 3.5.2 外连接

外连接join后必须有into，然后可以加上XX.DefaultIfEmpty()，表示对于引用类型将返回null,而对于值类型则返回0。对于结构体类型，则会根据其成员类型将它们相应地初始化为null(引用类型)或0(值类型)，

如果仅需要统计右表的个数或者其它属性，可以省略XX.DefaultIfEmpty, 但如果需要点出来右表的字段，则不能省。

#### 3.5.2.1 linq实现

查询所有用户对应的班级,因为用户和成绩一对多，所以会出现多条数据

```
    var list = (from u in _context.Users
                join sc in _context.Scores on u.Id equals sc.UserId
                into ulist
                from sco in ulist.DefaultIfEmpty()
                where u.Account != null //这个条件只是展示如何添加条件
                select new
                {
                    UserId = u.Id,
                    Account = u.Account,
                    sco.CourseName
                }).ToList();
    Console.WriteLine(JsonConvert.SerializeObject(list));

            var list = (from g in _groupdefRep.EntitiesAsNoTracking
                        join cl in _clouduserRep.EntitiesAsNoTracking on g.CloudId equals cl.Id
                        into glist
                        from c in glist.DefaultIfEmpty()
                        where g.Enabled.Value == 1 && (cloudId == 0 || g.CloudId == cloudId)
                        orderby c.Id, g.GroupName
                        select new
                        {
                            Gid = g.Id,
                            Name = c == null ? g.GroupName : c.CloudName
                        }).ToList();
```

可以使用：string.IsNullOrEmpty  不能使用：string.IsNullOrWhiteSpace

生成SQL

```
      SELECT `u`.`Id` AS `UserId`, `u`.`Account`, `s`.`CourseName`
      FROM `user` AS `u`
      LEFT JOIN `score` AS `s` ON `u`.`Id` = `s`.`UserId`
```

结果

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/1621563339181-f19d1904-de1f-4897-a64c-d14e45f17071.png)

如果要查询成绩，应该这么写，上面那个写法会直接报错， Nullable object must have a value

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/1621563656968-030835ff-2188-43c9-99e6-b2c475e02f3e.png)

### 3.5.3 GroupJoin

GroupJoin操作符常应用于返回“主键对象-外键对象集合”形式的查询，例如“用户信息-此用户下所有科目成绩”

```
    var list = _context.Users.Where(t => t.Account != null)
        .GroupJoin(_context.Scores, u => u.Id, sc => sc.UserId, (u, sc) => new
        {
            u.Account,
            u.PassWord,
            Scores = sc
        }).ToList();
    Console.WriteLine(JsonConvert.SerializeObject(list));
```

该代码会提示错误，原因如：https://docs.microsoft.com/zh-cn/ef/core/querying/client-eval

### 3.5.4 GrouBy

分组操作 根据用户分组，求科目数

```
    var list = (from sc in _context.Scores
                group sc by sc.UserId
                into g
                select new
                {
                    g.Key,
                    Count = g.Count()
                }).ToList();
    Console.WriteLine(JsonConvert.SerializeObject(list));

    var list2 = _context.Scores.GroupBy(sc => sc.UserId).Select(t => new
    {
        t.Key,
        Count = t.Count()
    }).ToList();
    Console.WriteLine(JsonConvert.SerializeObject(list2));
```

生成SQL

```
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT `s`.`UserId` AS `Key`, COUNT(*) AS `Count`
      FROM `score` AS `s`
      GROUP BY `s`.`UserId`
[{"Key":"1395392302788120576","Count":2},{"Key":"1395392303090110464","Count":2}]
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT `s`.`UserId` AS `Key`, COUNT(*) AS `Count`
      FROM `score` AS `s`
      GROUP BY `s`.`UserId`
[{"Key":"1395392302788120576","Count":2},{"Key":"1395392303090110464","Count":2}]
```

## 3.6 查询是否存在

简单查询是否存在

```
var exist = await _templateFieldMappingRep.EntitiesAsNoTracking.AnyAsync(t => t.CluFieldId == 111);
```

联表查询是否存在

```
var existTitle =
    await (from templatefield in _templateFieldMappingRep.EntitiesAsNoTracking.Where(t =>
            t.CluTemplateId == dto.CluTemplateId)
            from field in _conclusionTemplateFieldRep.EntitiesAsNoTracking.Where(t =>
                t.FieldName == dto.FieldName)
            where templatefield.CluFieldId == field.CluFieldId
            select new { field.CluFieldId }).AnyAsync().ConfigureAwait(false);
```

# 4. 添加

## 4.1 基础添加

```
  	_context.Movie.Add(movie);
	// or
	await _context.Movie.AddRangeAsync(movies)
    await _context.SaveChangesAsync();
```

## 4.2 已经设置自增键的插入

先关闭自增然后插入数据后再开启自增

```
		db.Database.OpenConnection();
        db.Database.ExecuteSqlCommand("SET IDENTITY_INSERT [T_RoleInfor] ON");
        var r2 = new T_RoleInfor()
        {
            id = 123,
            roleName = "管理员",
            roleDescription = "我是管理员"
            };
        db.Add(r2);
        int count2 = db.SaveChanges();
        db.Database.ExecuteSqlCommand("SET ID	ENTITY_INSERT [T_RoleInfor] OFF");
```

## 4.3 通过SQL添加

```
    var strSql2 = "INSERT INTO `userinfo`(`Id`, `Account`, `PassWord`) VALUES (@id, @account, @password);";
    var parameter2 = new MySqlParameter[] {
        new MySqlParameter("@id","22"),
        new MySqlParameter("@account","2222"),
        new MySqlParameter("@password","22222")
        };
    var flg = db.Database.ExecuteSqlRaw(strSql2, parameter2);

	// 调用存储过程
	int n = db.Database.ExecuteSqlCommand("DoSome @id", para);//参数化查询
```

2.x使用ExecuteSqlCommand，3.x使用ExecuteSqlRaw方法

# 5. 修改

```
    var  movie = await _context.Movie.FirstOrDefaultAsync(m => m.ID == id);
    movie.Name="李思";
    await _context.SaveChangesAsync();  
```

# 6. 删除

```
    var movie = await _context.Movie.FirstOrDefaultAsync(m => m.ID == id);
    _context.Movie.Remove(movie);
    await _context.SaveChangesAsync();
```

# 7. 参考文档

官方例子：https://docs.microsoft.com/zh-cn/ef/core/dbcontext-configuration/

 

