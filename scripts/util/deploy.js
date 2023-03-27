import path from "path";
import fs, {existsSync} from "fs";
import { mkdir } from "./mkdir.js";

const genHardhatDeploymentScript = (name) => {
	return `
    const hre = require("hardhat");
    async function main() {
        const Contract = await hre.ethers.getContractFactory("${name}");
        const contract = await Contract.deploy();
        await contract.deployed();
        console.log("${name} deployed to:", contract.address);
    };
    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
`.trim();
};

const genHardhatConfigScript = (network) => {
    return `
    require("@nomicfoundation/hardhat-toolbox");
    require("dotenv").config()

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const HW_TOKEN = process.env.HW_TOKEN
    /** @type import('hardhat/config').HardhatUserConfig */
    module.exports = {
    solidity: "0.8.17",
    networks: {
        ${network}: {
            url: "",
            accounts: [PRIVATE_KEY],
            httpHeaders: {"X-Auth-Token": HW_TOKEN}
        },
    }
    };
    `.trim();
}

const genTruffleDeploymentScript = (name) => {
	return `
    var MyContract = artifacts.require("${name}");
    module.exports = function(deployer) {
      deployer.deploy(MyContract);
    };
`.trim();
};

const createDeploy = (backendFolder, frameName, contractName) => {
    let content, deployPath, deployFile;
    switch (frameName) {
        case 'Hardhat' : 
            content = genHardhatDeploymentScript(contractName);
            deployPath = path.join(backendFolder, "script");
            deployFile = "deploy.js";
            break;
        case 'Truffle' : 
            content = genTruffleDeploymentScript(contractName);
            deployPath = path.join(backendFolder, "migrations");
            deployFile = "1_migration.js";
            break;
    }
    if (!existsSync(deployPath)) {
        mkdir(deployPath);
    }
    const writeStream = fs.createWriteStream(
		path.join(deployPath, deployFile)
	);
    writeStream.write(content);
	writeStream.end();
};

export { createDeploy };