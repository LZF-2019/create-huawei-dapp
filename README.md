# create-huawei-dapp

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmMyOTIxZGEzOTRmNTNjYzQ3NGE1M2IzMjdhZmZhZDkzMGU2MjZmNiZjdD1n/c4shRunRrQxaSJqnQt/giphy.gif)

## 快速开始

初始环境需要nodejs 16.0版本以上

1. 打开终端，输入命令。根据命令提示选择自己需要的合约和开发框架等内容，具体操作如下图所示。

```shell
# 根据需求选择开发框架、合约等内容
npx create-huawei-dapp@latest
```

2. 安装依赖

进入生成的项目文件夹中，根据不同开发框架完成安装依赖的操作

- Hardhat和Truffle都有各自的npm包，因此直接执行`npm i`就能根据生成的`package.json`来安装对应的依赖
- Foundry的依赖比较麻烦，需要根据文档按照步骤来安装（[中文版](https://learnblockchain.cn/docs/foundry/i18n/zh/index.html), [English](https://book.getfoundry.sh/)）。但是后续一些合约的依赖安装还是可以通过npm包来下载，例如选择erc合约需要对应的`@openzeppelin/contracts`。

```shell
# 进入创建好的文件目录中，安装依赖后，即可进行合约开发、编译、测试和部署等工作
cd my-dapp/backend
npm i
```

3. 合约开发
在第一步的选择中，项目目录的`contracts`文件夹中一般都生成了一个erc合约或者默认合约。用户可以根据自己的需求，对现有合约进行修改。如果只是简单的在测试网上面，则可以直接对生成的合约进行编译、测试和部署等操作。

---

1. 使用esbuild进行编译打包，并在.package.json中设置bin即可使用npx命令来运行
* 在编译打包的js文件第一行需加入下面命令来执行环境 否则npx会运行失败 显示command not found
#! /usr/bin/env node 
*
esbuild index.js --bundle --platform=node --target=node16.18 --outfile=dist/index.cjs