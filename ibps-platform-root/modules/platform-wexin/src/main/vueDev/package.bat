@echo off
@title vue package

set s=%time%

rem 检查nodeJS是否安装
node -v > nul || goto nonode

:hasnode
(
	if exist dist goto portal
)

:portal
(
	echo [%time:~0,8%] ------------------vue package------------------
	cmd /c npm run build
	del /s /q ..\webapp\css\*.*
	del /s /q ..\webapp\js\*.*
	xcopy /y /e .\dist ..\webapp
	goto exit
)

:nonode
(
	echo [%time:~0,8%] ------------------not install nodeJS------------------
)

:exit
(
	echo [%time:~0,8%] ------------------package end------------------
)

set e=%time%
set /a h1=%s:~0,2%
set /a m1=1%s:~3,2%-100
set /a s1=1%s:~6,2%-100
set /a h2=%e:~0,2%
set /a m2=1%e:~3,2%-100
set /a s2=1%e:~6,2%-100
if %h2% LSS %h1% set /a h2=%h2%+24
set /a ts1=%h1%*3600+%m1%*60+%s1%
set /a ts2=%h2%*3600+%m2%*60+%s2%
set /a ts=%ts2%-%ts1%
set /a hh=%ts%/3600
set /a mm=(%ts%-%hh%*3600)/60
set /a ss=%ts%%%60
echo [%time:~0,8%] ------------------spend %hh% h %mm% min %ss% s------------------
echo [%time:~0,8%] ------------------spend %hh% h %mm% min %ss% s------------------
pause
