# create-huawei-dapp# npm packge template based on typescript

1. 使用esbuild进行编译打包，并在.package.json中设置bin即可使用npx命令来运行
* 在编译打包的js文件第一行需加入下面命令来执行环境 否则npx会运行失败 显示command not found
#! /usr/bin/env node 
*
esbuild index.js --bundle --platform=node --target=node16.18 --outfile=dist/index.cjs