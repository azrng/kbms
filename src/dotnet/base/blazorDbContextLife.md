---
title: Blazor 中 DbContext 生命周期问题
lang: zh-CN
date: 2026-06-19
publish: true
author: azrng
isOriginal: true
category:
  - dotnet
tag:
  - Blazor
  - EF Core
  - DbContext
---

## 问题

在 Blazor 中，同一个界面进行添加然后编辑操作，是否在同一个 DbContext 生命周期内？

## 答案

**是的**，默认情况下会在同一个 DbContext 生命周期内，这可能导致问题。

### Blazor Server

- DbContext 生命周期与 Circuit（用户连接会话）绑定
- 同一个用户的所有操作都在同一个 Circuit 中
- 可能导致内存泄漏或实体追踪冲突

### Blazor WebAssembly

- Scoped 服务实际上变成类似 Singleton 的行为
- 同样在同一个 DbContext 生命周期内

---

## 解决方案

### 方案一：注册为 Transient

```csharp
services.AddTransient<IBaseRepository<Employee>, BaseRepository<Employee>>();
```

### 方案二：显式创建新 DbContext

```csharp
public async Task UpdateAsync(UpdateEmployeeVm vm)
{
    using var scope = _serviceScopeFactory.CreateScope();
    var repository = scope.ServiceProvider.GetRequiredService<IBaseRepository<Employee>>();
    // ... 后续操作
}
```

### 方案三：清理上下文状态

```csharp
public async Task UpdateAsync(UpdateEmployeeVm vm)
{
    _employeeRep.ClearTracker();
    var entity = await _employeeRep.Entities.FirstOrDefaultAsync(t => t.Id == vm.Id);
    // ... 后续操作
}
```

### 推荐做法

```csharp
public async Task UpdateAsync(UpdateEmployeeVm vm)
{
    // 使用 AsNoTracking 查询，然后手动附加实体
    var entity = await _employeeRep.EntitiesNoTacking
        .FirstOrDefaultAsync(t => t.Id == vm.Id);
    if (entity is null)
        throw new ArgumentException("员工标识无效");

    // 手动更新属性
    entity.Sex = vm.Sex;
    entity.City = vm.City;
    entity.Name = vm.Name;
    entity.SetModifyer("admin");

    // 显式地标记实体状态
    _employeeRep.Entry(entity).State = EntityState.Modified;
    await _employeeRep.SaveChangesAsync();
}
```

---

## 要点

1. 查询操作使用 `EntitiesNoTracking`
2. 修改操作显式控制实体状态
3. 避免在同一 DbContext 生命周期内重复追踪同一实体
