@echo off
setlocal
REM Proxy pull for kbms. Usage: pull-proxy.bat [branch]  (default: main)
set "BRANCH=%~1"
if "%BRANCH%"=="" set "BRANCH=main"
set "PROXY=http://127.0.0.1:7890"

echo [pull-proxy] branch=%BRANCH% proxy=%PROXY%
git -c http.proxy=%PROXY% pull https://github.com/azrng/kbms.git %BRANCH%
set "EC=%ERRORLEVEL%"

if not "%EC%"=="0" (
  echo.
  echo [pull-proxy] failed, exit code %EC%. Check:
  echo   1. proxy on 7890 alive?  netstat -ano ^| findstr 7890
  echo   2. branch name correct?
)
endlocal & exit /b %EC%
