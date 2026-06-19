
// 数据库

export const dataBaseSidebar = [
  "readme.md",
  {
    text: "基础操作",
    prefix: "/dataBase/commonOperator/",
    collapsible: true,
    children: [
      "dbDesign.md",
      "index.md",
      "transaction.md",
      "executeOrder.md",
      "dbPool.md",
      "masterSlaveFailover.md"
    ]
  },
  {
    text: "扩展",
    prefix: "/dataBase/extend/",
    collapsible: true,
    children: [
      "solutions.md",
      "sqlOptimize.md",
      "sharding.md",
      "cacheDbConsistency.md",
      "databaseMigration.md",
      {
        text: "小工具",
        prefix: "/dataBase/extend/tools/",
        collapsible: true,
        children: ["dbtool.md"]
      }]
  },
  {
    text: "SQL Server",
    prefix: "/dataBase/sqlserver/",
    collapsible: true,
    children: ["readme.md",
      {
        text: "基础知识",
        prefix: "/dataBase/sqlserver/base/",
        collapsible: true,
        children: [
          "dataType.md",
          "operation.md",
          "functions.md",
          "hierarchyid.md"]
      },
      "dbhelper.md",
      "extensions.md",
      {
        text: "安装",
        prefix: "/dataBase/sqlserver/install/",
        collapsible: true,
        children: [
          "windowsInstall.md",
          "linuxInstall.md",
          "dockerInstall.md"
        ]
      },
      "issue.md",
      "scheduledBackupPlan.md"
    ]
  },
  {
    text: "MySQL",
    prefix: "/dataBase/mysql/",
    collapsible: true,
    children: [
      "readme.md",
      "baseContent.md",
      {
        text: "基础知识",
        prefix: "/dataBase/mysql/basics/",
        collapsible: true,
        children: [
          "utf8VsUtf8mb4.md",
          "dataTable.md",
          "partitionTable.md",
          "mysqlDataTypes.md",
          "columnOperations.md",
          "queryData.md",
          "preparedStatements.md",
          "functions.md",
          "index.md",
          "aggregateConditions.md",
          "storedProcedure.md",
          "executionOrder.md",
          "lock.md",
          "transaction.md"]
      },
      {
        text: "MySQL函数",
        prefix: "/dataBase/mysql/mysqlFunctions/",
        collapsible: true,
        children: ["mysqlFunctions.md",
          "dataTypes.md",
          "comparison.md"]
      },
      {
        text: "数据库优化记录",
        prefix: "/dataBase/mysql/optimizationLogs/",
        collapsible: true,
        children: ["optimizationLogs.md",
          "tableStructureOptimization.md",
          "querySql.md",
          "readWriteSeparation.md",
          "cautiousOperations.md"]
      },
      "codeOperator.md",
      {
        text: "进阶",
        prefix: "/dataBase/mysql/advanced/",
        collapsible: true,
        children: [
          "masterSlaveReplication.md",
          "federated.md"
        ]
      },
      {
        text: "执行计划",
        prefix: "/dataBase/mysql/executionPlan/",
        collapsible: true,
        children: ["checkIndexEffectiveness.md"]
      },
      {
        text: "脚本",
        prefix: "/dataBase/mysql/scripts/",
        collapsible: true,
        children: ["mysqlBackupScript.md",
          "mysqldumpOperator.md",]
      },
      {
        text: "安装",
        prefix: "/dataBase/mysql/install/",
        collapsible: true,
        children: [
          "readme.md",
          "windowInstall.md",
          "linuxInstall.md",
          "dockerInstall.md"
        ]
      },
      {
        text: "遇到的问题",
        prefix: "/dataBase/mysql/issues/",
        collapsible: true,
        children: ["issue.md",
          "netFrameworkUse.md",
          "recursiveQueryDepthLimit.md"]
      }]
  },
  {
    text: "PostgreSQL",
    prefix: "/dataBase/postgresql/",
    collapsible: true,
    children: [
      "readme.md",
      "baseContent.md",
      "columnType.md",
      "timestamp.md",
      "transaction.md",
      "method.md",
      "extension.md",
      "explainPlan.md",
      "systemOperator.md",
      "script.md",
      "install.md"]
  },
  {
    text: "Oracle",
    prefix: "/dataBase/oracle/",
    collapsible: true,
    children: ["description.md",
      "basicOperations.md",
      "commonDataTypes.md",
      "functions.md",
      "dblink.md",
      {
        text: "dotNet操作",
        prefix: "/dataBase/oracle/dotnetOperations/",
        collapsible: true,
        children: ["dotnetOperations.md",
          "oraclehelper.md"]
      },
      {
        text: "数据库备份和还原",
        prefix: "/dataBase/oracle/backupAndRestore/",
        collapsible: true,
        children: ["backupAndRestore.md",
          "serverScheduledTasks.md"]
      },
      {
        text: "安装",
        prefix: "/dataBase/oracle/installation/",
        collapsible: true,
        children: ["winx64_12201ClientInstall.md",
          "oracleInstallClient12_2Guide.md"]
      },
      {
        text: "Oracle使用问题",
        prefix: "/dataBase/oracle/oracleIssues/",
        collapsible: true,
        children: ["oracleIssues.md",
          "11gCreateDatabase.md"]
      }]
  },
  {
    text: "Redis",
    prefix: "/dataBase/redis/",
    collapsible: true,
    children: [
      "readme.md",
      {
        text: "简单介绍",
        prefix: "/dataBase/redis/introduction/",
        collapsible: true,
        children: [
          "memoryOptimization.md",
          "persistence.md"]
      },
      {
        text: "Redis数据类型",
        prefix: "/dataBase/redis/redisDataTypes/",
        collapsible: true,
        children: ["redisDataTypes.md",
          "string.md",
          "hash.md",
          "sortedSet.md",
          "set.md",
          "list.md",
          "hyperLogLog.md"]
      },
      "basicCommands.md",
      "redisPubSub.md",
      "multiThreadReuse.md",
      "redisMessageQueue.md",
      "fullTextSearch.md",
      {
        text: "组件",
        prefix: "/dataBase/redis/components/",
        collapsible: true,
        children: ["simpleUsage.md",
          "freeredis.md",
          {
            text: "StackExchange",
            prefix: "/dataBase/redis/components/stackexchange/",
            collapsible: true,
            children: ["description.md",
              "redishelper.md",
              "stackexchange_redis.md"]
          },
          "redisom.md",
          "nrejson.md",
          "csredis.md"]
      },
      {
        text: "安装",
        prefix: "/dataBase/redis/installation/",
        collapsible: true,
        children: [
          "deploymentPlan.md",
          "windowsClient.md",
          "linuxInstallRedis.md",
          "dockerComposeDeployRedis.md"
        ]
      },
      "issue.md"
    ]
  },
  {
    text: "MongoDB",
    prefix: "/dataBase/mongodb/",
    collapsible: true,
    children: ["introduction.md",
      "conceptAnalysis.md",
      "useCases.md",
      "basicOperations.md",
      "codeOperations.md",
      "executionPlan.md",
      {
        text: "linux安装",
        prefix: "/dataBase/mongodb/linuxInstallation/",
        collapsible: true,
        children: ["linuxInstall.md",
          "windowsInstall.md",
          "dockerComposeDeployMongodb.md"]
      }]
  },
  {
    text: "SQLite",
    prefix: "/dataBase/sqlite/",
    collapsible: true,
    children: [
      "readme.md",
      "baseContent.md",
      "sqlitefts5.md"]
  },
  {
    text: "达梦数据库",
    prefix: "/dataBase/dameng/",
    collapsible: true,
    children: [
      "readme.md",
      "connect.md"
    ]
  },
  {
    text: "Elasticsearch",
    prefix: "/dataBase/elasticsearch/",
    collapsible: true,
    children: ["readme.md"]
  },
  {
    text: "Clickhouse",
    prefix: "/dataBase/clickhouse/",
    collapsible: true,
    children: [
      "readme.md",
      "baseContent.md"
    ]
  },
  {
    text: "Qdrant",
    prefix: "/dataBase/qdrant/",
    collapsible: true,
    children: [
      "readme.md",
      "dotnetOperator.md",
      "install.md"
    ]
  },
  {
    text: "Milvus",
    prefix: "/dataBase/milvus/",
    collapsible: true,
    children: [
      "readme.md",
      "dotnetOperator.md",
      "install.md"
    ]
  },
  {
    text: "Neo4j",
    prefix: "/dataBase/neo4j/",
    collapsible: true,
    children: [
      "readme.md"
    ]
  },
  {
    text: "DockDb",
    prefix: "/dataBase/dockdb/",
    collapsible: true,
    children: [
      "readme.md",
      "conceptAndCompare.md",
      "connectionSetup.md",
      "queryAndParameter.md",
      "typeMappingAndTraps.md",
      "bestPracticesAndTroubleshoot.md"
    ]
  },
  {
    text: "Cassandra",
    prefix: "/dataBase/cassandra/",
    collapsible: true,
    children: ["readme.md",
      "baseContent.md"]
  },
  {
    text: "IndexedDB",
    prefix: "/dataBase/indexeddb/",
    collapsible: true,
    children: ["readme.md"]
  },
  {
    text: "KingBaseEs",
    prefix: "/dataBase/kingBaseEs/",
    collapsible: true,
    children: ["readme.md"]
  },
  {
    text: "LiteDB",
    prefix: "/dataBase/litedb/",
    collapsible: true,
    children: ["readme.md"]
  },
  {
    text: "中间件",
    prefix: "/dataBase/middleware/",
    collapsible: true,
    children: [
      "sqlAudit.md"
    ]
  }];