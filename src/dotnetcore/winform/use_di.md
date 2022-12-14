---
title: WinForm使用依赖注入
lang: zh-CN
date: 2022-08-25
publish: true
author: azrng
isOriginal: true
category:
 - dotNet
tag:
 - winform
 - ioc
---
# WinForm使用依赖注入

# 介绍

关于依赖注入是什么？依赖注入是一种具体的编码技巧，对我来说最明显的就是解决代码的耦合性。

# 目的

ASP.NetCore中本身容器容器已经创建好了，只需要往容器添加服务即可，但是在Winform中默认还是通过new的方式来进行操作的(虽然我已经升级成了.Net6)，最近在把一个开源项目进行增加自用的功能，然后我顺带将原来的NetF升级为NetCore，然后就想用依赖注入方式去试试了。

> C/S代码写的少，如有不对，麻烦指正。

# 操作

本文示例环境：VS2022、.Net6

## 准备

示例包含以下代码

- 窗体

- - Form1
  - Form2

- Service

- - IUserservice以及Userservice
  - IOrderService以及OrderService

```csharp
public interface IUserservice
{
    string GetName();
}

public class UserService : IUserservice
{
    public string GetName()
    {
        return "IUserservice";
    }
}

public interface IOrderService
{
    string GetName();
}

public class OrderService : IOrderService
{
    public string GetName()
    {
        return "IOrderService";
    }
}
```

## 场景

在Form1通过构造函数注入IUserservice，并且在Load事件里面调用IUserservice的获取名称方法，点击页面按钮后让Form2显示，Form2中通过依赖注入了IOrderService在Load事件里面调用IOrderService的获取名称方法。如果可以多次操作不报错就是成功。

## 开始

引用组件

```csharp
<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="6.0.0" />
```

增加了一个ServiceProviderHelper的操作类

```csharp
public static class ServiceProviderHelper
{
    /// <summary>
    /// 全局服务提供者
    /// </summary>
    public static IServiceProvider ServiceProvider { get; private set; } = null!;

    /// <summary>
    /// 初始化构建ServiceProvider对象
    /// </summary>
    /// <param name="serviceProvider"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public static void InitServiceProvider(ServiceProvider serviceProvider)
    {
        ArgumentNullException.ThrowIfNull(serviceProvider, nameof(serviceProvider));

        ServiceProvider = serviceProvider;
    }

    /// <summary>
    /// 获取Form服务
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    public static Form GetFormService(Type type)
    {
        var service = ServiceProvider.GetRequiredService(type);
        if (service is Form fService)
        {
            return fService;
        }
        else
        {
            throw new ArgumentException($"{type.FullName} is not a Form");
        }
    }

    /// <summary>
    /// 获取Form服务
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    public static T GetService<T>() where T : class
    {
        return ServiceProvider.GetRequiredService<T>();
    }
}
```

修改Program方法

```csharp
internal static class Program
{
    /// <summary>
    ///  The main entry point for the application.
    /// </summary>
    [STAThread]
    private static void Main()
    {
        //.net6写法 之前是三行合一行
        ApplicationConfiguration.Initialize();

        //创建服务容器
        var services = new ServiceCollection();
        //添加服务注册
        ConfigureServices(services);

        //构建ServiceProvider对象
        ServiceProviderHelper.InitServiceProvider(services.BuildServiceProvider());

        //获取指定服务
        var main = ServiceProviderHelper.ServiceProvider.GetRequiredService<Form1>();
        Application.Run(main);
    }

    /// <summary>
    /// 注入服务
    /// </summary>
    /// <param name="services"></param>
    public static void ConfigureServices(IServiceCollection services)
    {
        //批量注入可以使用Scrutor或者自己封装
        services.AddScoped<IUserservice, UserService>();
        services.AddScoped<IOrderService, OrderService>();

        //其他的窗体也可以注入在此处
        services.AddSingleton(typeof(Form1));
        services.AddTransient(typeof(Form2));
    }
}
```

分别在Form1和Form2进行注入

```csharp
private readonly IUserservice _userservice;

public Form1(IUserservice userservice)
{
    InitializeComponent();
    _userservice = userservice;
}

private readonly IOrderService _orderService;

public Form2(IOrderService orderService) : this()
{
    _orderService = orderService;
}
```

点击Form1窗体按钮让Form2窗体显示

```csharp
private void button1_Click(object sender, EventArgs e)
{
    var form2 = ServiceProviderHelper.GetFormService(typeof(Form2));
    form2.Show();
}
```

正常操作几次并没有发现异常。

# 资料

在.NetCore3.1上基于Winform实现依赖注入实例：http://www.ty2y.com/study/znetcore3.1sjywinformsxylzrsl.html
