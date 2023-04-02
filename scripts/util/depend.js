import path from "path";
import fs, {existsSync} from "fs";

const genHardhatDependScript = () => {
    return `
{
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "@nomicfoundation/hardhat-toolbox": "^2.0.2",
        "@openzeppelin/contracts": "^4.8.2",
        "dotenv": "^16.0.3",
        "ethers": "^5.7.2",
        "hardhat": "^2.13.0"
    }
}`.trim();
};

const genTruffleDependScript = () => {
    return `
{
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "truffle": "^5.8.1",
        "@truffle/hdwallet-provider": "^2.1.9",
        "web3": "^1.9.0"
    }
}`.trim();
};

export const createDepend = (backendFolder, frameName) => {
    let content, dependFile;
    switch (frameName) {
        case 'Hardhat' : 
            content = genHardhatDependScript();
            break;
        case 'Truffle' : 
            content = genTruffleDependScript();
            break;
    }
    dependFile = "package.json"
    const writeStream = fs.createWriteStream(
		path.join(backendFolder, dependFile)
	);
    writeStream.write(content);
	writeStream.end();
};