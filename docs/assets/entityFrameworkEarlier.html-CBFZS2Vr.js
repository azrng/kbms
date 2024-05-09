import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as r,c as l,b as e,e as i,f as d,d as n}from"./app-D8HBJYTp.js";const c="/kbms/common/image-20230725101349387.png",u={},o=n(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>作为开发者，我们可以让很多代码运行起来。但这是否意味着我们以&quot;正确的方式&quot;来做呢？有时候是正确的，但其他时候可能存在更好的方法。而当有更好的方法时，我们往往并不知道。这其中有很多原因。时间紧迫、心情不好、新功能、复制粘贴解决方案（或如今由AI生成的代码）、缺乏知识以及其他因素，都可能导致非理想的解决方案。</p><p>这篇博文是关于我之前不了解Entity Framework提供的所有功能，这是我希望早点知道的。我在阅读别人的文章或演讲时，或者朋友指引我，或者通过阅读文档时偶然发现了这些功能。甚至通过撰写这篇博文，我也发现了一些额外的方法。</p><p>我希望这篇博文能帮助你以推荐/官方的方式完成任务，而不是使用那些常常引入一些陷阱的变通方法。</p><h2 id="内容" tabindex="-1"><a class="header-anchor" href="#内容"><span>内容</span></a></h2><h3 id="开始" tabindex="-1"><a class="header-anchor" href="#开始"><span>开始</span></a></h3><p>为了遵循示例，我们需要一个起点来工作。 对于这篇博文，我使用以下简单模型。 我们有一个实体Customer，它有一个实体集合Address。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>public class Customer
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List&lt;Address&gt; Addresses { get; set; }
}
 
public class Address
{
    public Guid Id { get; set; }
    public string Street { get; set; }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动包含" tabindex="-1"><a class="header-anchor" href="#自动包含"><span>自动包含</span></a></h3><p>您可能已经知道，在检索数据时，可以使用该方法预先加载相关实体。 例如，假设我们有一个客户，我们希望在查询客户时急切加载地址。 若要实现此目的，请使用Include方法包含客户的地址。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customersWithAddresses = await dbContext.Customers
    .Include(c =&gt; c.Address)
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>预先加载的好处是，可以最大程度地减少查询所需数据的数据库往返次数。 相反，所有数据都在单个查询中检索（或使用 时检索几个查询）。 在许多情况下，单个查询比多个查询快，并且还减少了数据库服务器上的负载。<code>AsSplitQuery()</code></p><p>但是，当您需要在大多数查询中包含相同的实体关系时，这可能会变得重复。 当您忘记包含进一步使用的相关实体时，它还可能导致错误。</p><p>AutoInclude是一项简化相关实体的预先加载的功能。 它通过在检索数据时自动包含相关实体来自动执行此过程。 这意味着您不必再在查询中使用该Include方法。</p><p>当我知道我总是需要访问相关实体时，我发现这很有用。 这样，我就不必担心实体的状态，无论是否检索到相关实体。</p><p>要启用AutoInclude功能，请在配置实体关系时导航到相关实体，并使用EntityTypeBuilder调用AutoInclude方法。示例可以按照以下配置进行重构。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>internal class CustomerEntityConfiguration : IEntityTypeConfiguration&lt;Customer&gt;
{
    public void Configure(EntityTypeBuilder&lt;Customer&gt; builder)
    {
        builder.Navigation(e =&gt; e.Addresses)
            .AutoInclude();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，当您检索数据时，将自动包含相关地址。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customersWithAddresses = await dbContext.Customers
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于那些只需要查询特定实体的情况，您可以使用IgnoreAutoInclude方法来避免自动包含配置的相关实体。当性能至关重要且您不需要相关联的实体时，这非常有用。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customers = await dbContext.Set&lt;Customer&gt;()
    .IgnoreAutoIncludes()
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文档：https://learn.microsoft.com/zh-cn/ef/core/querying/related-data/eager#model-configuration-for-auto-including-navigations</p><h3 id="单个或者拆分查询" tabindex="-1"><a class="header-anchor" href="#单个或者拆分查询"><span>单个或者拆分查询</span></a></h3><p>Including（或AutoIncluding）相关实体可能导致性能问题，尤其是当相关实体包含大量关联数据时。因为生成的SQL查询包含许多连接操作，这可能导致检索到大量重复数据。这被称为笛卡尔爆炸。</p><p>举个例子，假设一个客户有10个地址。当您查询这个客户时，生成的SQL查询将包含一个与地址的连接操作。结果是客户会被检索10次，每个地址检索一次。</p><p>解决这个问题的方法是使用AsSplitQuery将查询分成多个查询。这样，客户只会被检索一次，而地址会在单独的查询中检索。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customersWithAddresses = await dbContext.Set&lt;Customer&gt;()
    .AsSplitQuery()
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Entity Framework还通过在检测到单个查询中加载多个集合时记录警告来帮助你。</p><p>单个查询是默认行为，但您也可以使用 UseQuerySplittingBehavior方法在DbContextOptionsBuilder上全局启用此行为。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>optionsBuilder.UseSqlServer(connectionString, o =&gt; o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启用拆分查询后，可以使用AsSingleQuery强制单个查询。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customersWithAddresses = await dbContext.Set&lt;Customer&gt;()
    .AsSingleQuery()
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文档：https://learn.microsoft.com/en-us/ef/core/querying/single-split-queries</p><h3 id="查询过滤器" tabindex="-1"><a class="header-anchor" href="#查询过滤器"><span>查询过滤器</span></a></h3><p>这个提示与AutoInclude类似，因为HasQueryFilter也允许您在一个集中的位置配置实体。顾名思义，HasQueryFilter用于在检索数据时过滤实体。</p><p>HasQueryFilter定义了一个适用于该实体所有查询的全局过滤器。我发现这在以下情况下非常有用：过滤已被软删除的实体，或者过滤您不感兴趣但不能删除的实体。而不是将以下逻辑复制到所有查询中以删除已删除的客户。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customers = await dbContext.Set&lt;Customer&gt;()
    .Where(q =&gt; q.DeletedOn == null)
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以通过使用HasQueryFilter进行重构来实现这一目的。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>internal class CustomerEntityConfiguration : IEntityTypeConfiguration&lt;Customer&gt;
{
    public void Configure(EntityTypeBuilder&lt;Customer&gt; builder)
    {
        builder.HasQueryFilter(q =&gt; q.DeletedOn == null);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当存在全局过滤器时，您还可以使用IgnoreQueryFilters在那些临时查询中禁用它。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customers = await dbContext.Set&lt;Customer&gt;()
    .IgnoreQueryFilters()
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文档：https://learn.microsoft.com/zh-cn/ef/core/querying/filters</p><h3 id="时态-历史-表" tabindex="-1"><a class="header-anchor" href="#时态-历史-表"><span>时态(历史)表</span></a></h3><p>SQL的时间表是有用的，因为它可以捕获SQL表中与数据相关的所有更改。其原理是创建一个新表（默认约定是在表名后加上&quot;History&quot;后缀），该表与原始表具有相同的结构。还会在新创建的表中添加两列&quot;PeriodStart&quot;和&quot;PeriodEnd&quot;（这些是默认名称）。当原始表中的记录被更新时，旧版本将被插入到历史表中。当记录被删除时，旧版本也会被插入到历史表中。</p><p>通过这种方式跟踪变更可以捕获特定表的完整历史记录。这对于保留变更的审计日志非常有用。</p><p>当然，如果无法查询这些数据，则几乎没有价值。这就是时间表的作用，它允许您查询历史表以获取完整的（或更全面的）画面。</p><p>要将实体标记为时间表，在配置模型时使用IsTemporal。在生成新数据库架构时，您会注意到历史表已包含在新的脚本中。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>internal class CustomerEntityConfiguration : IEntityTypeConfiguration&lt;Customer&gt;
{
    public void Configure(EntityTypeBuilder&lt;Customer&gt; builder)
    {
        builder.ToTable(&quot;Customers&quot;, o =&gt; o.IsTemporal());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建表后，可以使用各种内置方法查询和检索表的历史数据。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customerHistory = await dbContext.Set&lt;Customer&gt;()
    .TemporalAll()
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，检索了所有历史数据，但也有可能检索特定时间范围内的历史数据。 我发现这对于查询基于年份的数据很有用。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customerHistory = await dbContext.Set&lt;Customer&gt;()
    .TemporalFromTo(startOfYear, endOfYear)
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>请记住，所有自动包含的实体也包含在时态查询中，这通常会引发异常。</p><p>全局查询筛选器的计数相同。</p><p>若要避免这种情况，可以使用IgnoreAutoIncludes 和IgnoreQueryFilters方法来禁用此功能。</p></blockquote><p>文档：https://learn.microsoft.com/zh-cn/ef/core/providers/sql-server/temporal-tables#querying-historical-data</p><h3 id="阴影属性" tabindex="-1"><a class="header-anchor" href="#阴影属性"><span>阴影属性</span></a></h3><p>我见过许多模型，它们臃肿，具有不应该包含的属性。 但是，我们可以使用阴影属性来保持模型干净，并且只包含与域相关的属性。</p><p>影子属性的一个用例是审计列，例如CreatedOn、CreatedBy、... 或者，历史记录表中的期间列。 这些列可用于跟踪记录的创建者或更新者，但它们不会向域添加任何价值。</p><p>另一个用例是保存对外键的引用的属性，同时还包含导航属性。 我觉得这很令人困惑，因为不清楚要使用哪个属性。 例如：</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>class Customer
{
    // foreign key
    public Guid AddressId { get; set; }
 
    // navigation property
    public Address Address { get; set; }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相反，我更喜欢以下模型。Entity Framework将自动创建所需的影子属性并添加所需的关系约束。在这个例子中，影子属性将是AddressId。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>class Customer
{
    public Address Address { get; set; }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们查看数据库架构时，我们会看到创建了列AddressId，并且它被配置为Addresses表的外键。</p><p>如果我们看原始的例子，其中一个客户拥有多个地址（而不是单个地址），我们会发现在Addresses表中创建了CustomerId列，因为这是一对多的关系。</p><p>影子属性也可以用于查询数据，例如查询先前创建的历史表。要访问影子属性，请使用EF.Property方法。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customers = await dbContext.Set&lt;Customer&gt;()
    .TemporalAll()
    .Where(c =&gt; EF.Property&lt;DateTime&gt;(c, &quot;PeriodStart&quot;) &gt;= DateTime.Today)
    .OrderBy(e =&gt; EF.Property&lt;DateTime&gt;(e, &quot;PeriodEnd&quot;))
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个知识，我们可以使用DeletedOn属性重构先前的代码片段，将其作为全局过滤器中的影子属性使用。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>internal class CustomerEntityConfiguration : IEntityTypeConfiguration&lt;Customer&gt;
{
    public void Configure(EntityTypeBuilder&lt;Customer&gt; builder)
    {
        // builder.HasQueryFilter(q =&gt; q.DeletedOn == null);
 
        // This is needed to create the column in the database
        builder.Property&lt;DateTime?&gt;(&quot;DeletedOn&quot;);
        builder.HasQueryFilter(e =&gt; EF.Property&lt;bool&gt;(e, &quot;DeletedOn&quot;) == null);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若要设置和更新影子属性的值，请获取EntityEntry实体并使用该Property方法。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>dbContext.Entry(customer).Property(&quot;DeletedOn&quot;).CurrentValue = DateTime.UtcNow;
dbContext.SaveChanges();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当你不需要考虑这些属性，而是希望它们自动设置时非常方便。可以通过重写DbContext的SaveChanges方法来实现这一点。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>public class EfDemoDbContext : DbContext
{
    public override int SaveChanges()
    {
        ChangeTracker.DetectChanges();
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Property(&quot;CreatedOn&quot;).CurrentValue = DateTime.UtcNow;
            }
            if (entry.State == EntityState.Modified)
            {
                entry.Property(&quot;UpdatedOn&quot;).CurrentValue = DateTime.UtcNow;
            }
        }
        return base.SaveChanges();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文档：https://learn.microsoft.com/zh-cn/ef/core/modeling/shadow-properties</p><h3 id="数据库函数" tabindex="-1"><a class="header-anchor" href="#数据库函数"><span>数据库函数</span></a></h3><p>在先前的博客文章《使用Entity Framework使用SQL函数》中，我解释了如何使用Entity Framework消费SQL函数。简而言之，您可以使用DbFunction属性将一个C#方法映射到一个SQL函数。</p><p>在下面的示例中，我们将SoundEx SQL函数映射到一个C#方法。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>public class EfDemoDbContext : DbContext
{
    public EfDemoDbContext(DbContextOptions&lt;MyDbContext&gt; options)
        : base(options)
    {
    }
 
    [DbFunction(Name = &quot;SoundEx&quot;, IsBuiltIn = true, IsNullable = false)]
    public static string SoundEx(string input)
    {
        throw new NotImplementedException();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在可以在查询中使用SoundEx方法。</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var customersViaSoundEx = await dbContext.Set&lt;Customer&gt;()
    .Where(c =&gt; EfDemoDbContext.SoundEx(c.Name) == EfDemoDbContext.SoundEx(&quot;Jhon Do&quot;))
    .ToListAsync();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sqlquery转未映射类型" tabindex="-1"><a class="header-anchor" href="#sqlquery转未映射类型"><span>SqlQuery转未映射类型</span></a></h3>`,79),v={href:"https://timdeschryver.dev/blog/you-can-now-return-unmapped-types-from-raw-sql-select-statements-with-entity-framework-8",target:"_blank",rel:"noopener noreferrer"},m=n('<p>文档：https://learn.microsoft.com/zh-cn/ef/core/what-is-new/ef-core-8.0/whatsnew#raw-sql-queries-for-unmapped-types</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>总结一下这篇文章，我只能说要充分利用Entity Framework提供的功能。</p><p>本文中的示例表明，Entity Framework内置了强大的功能，可以增强应用程序的性能和可维护性。关键是要知道它们的存在。</p><p>作者：Tim Deschryver</p><p>原文地址：https://timdeschryver.dev/blog/entity-framework-features-i-wish-i-knew-earlier</p><h2 id="文章授权" tabindex="-1"><a class="header-anchor" href="#文章授权"><span>文章授权</span></a></h2><p>申请等了好几天，终于等来了大佬的授权，嘿嘿，截图如下</p><figure><img src="'+c+'" alt="image-20230725101349387" tabindex="0" loading="lazy"><figcaption>image-20230725101349387</figcaption></figure>',9);function p(b,g){const t=a("ExternalLinkIcon");return r(),l("div",null,[o,e("p",null,[e("a",v,[i("您现在可以使用 Entity Framework 8 从"),d(t)]),i("原始 SQL select 语句返回未映射的类型，我们已经看到可以从原始 SQL select 语句返回未映射的类型。这对于使用优化的查询或返回数据的子集或聚合非常有用。")]),m])}const C=s(u,[["render",p],["__file","entityFrameworkEarlier.html.vue"]]),f=JSON.parse('{"path":"/orm/efcore/extract/entityFrameworkEarlier.html","title":"我希望早点知道的实体框架功能","lang":"zh-CN","frontmatter":{"title":"我希望早点知道的实体框架功能","lang":"zh-CN","date":"2023-07-25T00:00:00.000Z","author":"Tim Deschryver","isOriginal":true,"category":["orm"],"tag":["EFCore"],"filename":"entityFrameworkEarlier","docsId":"faa43d69-4566-4e13-a043-3b4c5f993d78","description":"前言 作为开发者，我们可以让很多代码运行起来。但这是否意味着我们以\\"正确的方式\\"来做呢？有时候是正确的，但其他时候可能存在更好的方法。而当有更好的方法时，我们往往并不知道。这其中有很多原因。时间紧迫、心情不好、新功能、复制粘贴解决方案（或如今由AI生成的代码）、缺乏知识以及其他因素，都可能导致非理想的解决方案。 这篇博文是关于我之前不了解Entity ...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/orm/efcore/extract/entityFrameworkEarlier.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"我希望早点知道的实体框架功能"}],["meta",{"property":"og:description","content":"前言 作为开发者，我们可以让很多代码运行起来。但这是否意味着我们以\\"正确的方式\\"来做呢？有时候是正确的，但其他时候可能存在更好的方法。而当有更好的方法时，我们往往并不知道。这其中有很多原因。时间紧迫、心情不好、新功能、复制粘贴解决方案（或如今由AI生成的代码）、缺乏知识以及其他因素，都可能导致非理想的解决方案。 这篇博文是关于我之前不了解Entity ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/image-20230725101349387.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-25T14:49:27.000Z"}],["meta",{"property":"article:author","content":"Tim Deschryver"}],["meta",{"property":"article:tag","content":"EFCore"}],["meta",{"property":"article:published_time","content":"2023-07-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-25T14:49:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"我希望早点知道的实体框架功能\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/image-20230725101349387.png\\"],\\"datePublished\\":\\"2023-07-25T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-25T14:49:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Tim Deschryver\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"内容","slug":"内容","link":"#内容","children":[{"level":3,"title":"开始","slug":"开始","link":"#开始","children":[]},{"level":3,"title":"自动包含","slug":"自动包含","link":"#自动包含","children":[]},{"level":3,"title":"单个或者拆分查询","slug":"单个或者拆分查询","link":"#单个或者拆分查询","children":[]},{"level":3,"title":"查询过滤器","slug":"查询过滤器","link":"#查询过滤器","children":[]},{"level":3,"title":"时态(历史)表","slug":"时态-历史-表","link":"#时态-历史-表","children":[]},{"level":3,"title":"阴影属性","slug":"阴影属性","link":"#阴影属性","children":[]},{"level":3,"title":"数据库函数","slug":"数据库函数","link":"#数据库函数","children":[]},{"level":3,"title":"SqlQuery转未映射类型","slug":"sqlquery转未映射类型","link":"#sqlquery转未映射类型","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]},{"level":2,"title":"文章授权","slug":"文章授权","link":"#文章授权","children":[]}],"git":{"createdTime":1690271281000,"updatedTime":1690296567000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1},{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":9.43,"words":2829},"filePathRelative":"orm/efcore/extract/entityFrameworkEarlier.md","localizedDate":"2023年7月25日","excerpt":"<h2>前言</h2>\\n<p>作为开发者，我们可以让很多代码运行起来。但这是否意味着我们以\\"正确的方式\\"来做呢？有时候是正确的，但其他时候可能存在更好的方法。而当有更好的方法时，我们往往并不知道。这其中有很多原因。时间紧迫、心情不好、新功能、复制粘贴解决方案（或如今由AI生成的代码）、缺乏知识以及其他因素，都可能导致非理想的解决方案。</p>\\n<p>这篇博文是关于我之前不了解Entity Framework提供的所有功能，这是我希望早点知道的。我在阅读别人的文章或演讲时，或者朋友指引我，或者通过阅读文档时偶然发现了这些功能。甚至通过撰写这篇博文，我也发现了一些额外的方法。</p>\\n<p>我希望这篇博文能帮助你以推荐/官方的方式完成任务，而不是使用那些常常引入一些陷阱的变通方法。</p>","autoDesc":true}');export{C as comp,f as data};
