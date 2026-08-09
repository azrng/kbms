请帮我只读排查本机 Codex 的 ~/.codex/logs_2.sqlite 是否仍在因为 TRACE 日志或流式事件持续高频写盘。

约束：
1. 只做只读诊断。
2. 不要删除文件，不要 VACUUM，不要 checkpoint/truncate，不要改 schema，不要创建 trigger，不要 kill 进程，不要升级或重装 Codex。
3. 所有 SQLite 查询都用只读 URI：db="file:$HOME/.codex/logs_2.sqlite?mode=ro"。
4. 如果 sqlite3、lsof 或数据库文件不存在，直接说明，不要猜。
5. 最后请输出：是否疑似中招、证据、风险等级、下一步建议。

请按下面顺序执行并解释结果：

第一步，确认文件大小：

```bash
du -h \
  ~/.codex/logs_2.sqlite \
  ~/.codex/logs_2.sqlite-wal \
  ~/.codex/logs_2.sqlite-shm 2>/dev/null

ls -lh ~/.codex/logs_2.sqlite* 2>/dev/null
```

第二步，只读检查 SQLite schema 和日志分布：

```bash
db="file:$HOME/.codex/logs_2.sqlite?mode=ro"

sqlite3 "$db" "PRAGMA table_info(logs);"

sqlite3 "$db" "
PRAGMA journal_mode;
PRAGMA wal_autocheckpoint;
SELECT COUNT(*) AS rows, MIN(id), MAX(id) FROM logs;
SELECT level, COUNT(*) AS rows, ROUND(SUM(estimated_bytes)/1024.0/1024.0, 1) AS mib
FROM logs
GROUP BY level
ORDER BY SUM(estimated_bytes) DESC;
"
```

第三步，做 15 秒短窗口采样：

```bash
db="file:$HOME/.codex/logs_2.sqlite?mode=ro"
before_id=$(sqlite3 "$db" "SELECT COALESCE(MAX(id),0) FROM logs;")
before_count=$(sqlite3 "$db" "SELECT COUNT(*) FROM logs;")
sleep 15
after_id=$(sqlite3 "$db" "SELECT COALESCE(MAX(id),0) FROM logs;")
after_count=$(sqlite3 "$db" "SELECT COUNT(*) FROM logs;")
echo "id_delta=$((after_id-before_id))"
echo "count_delta=$((after_count-before_count))"
```

第四步，查看是否有 Codex 进程占着数据库或 WAL：

```bash
lsof -nP \
  ~/.codex/logs_2.sqlite \
  ~/.codex/logs_2.sqlite-wal \
  ~/.codex/logs_2.sqlite-shm 2>/dev/null
```

判断标准：
- 如果 id_delta 很高，但 count_delta 很小或为 0，说明可能在持续插入又修剪旧日志。
- 如果 logs_2.sqlite-wal 持续变大，或者有老 Codex 进程占着 deleted WAL，要重点提示。
- 如果 id_delta 很低、WAL 不持续增长、只有当前 Codex 进程正常打开文件，就倾向于正常。
- 不要直接给我执行修复操作。需要修复时，只列出方案和风险，等我确认。