import path from "path";
import fs, {existsSync} from "fs";
import { mkdir } from "../workflow/common.js";

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

const genTruffleDeploymentScript = (name) => {
	return `
var MyContract = artifacts.require("${name}");
module.exports = function(deployer) {
    deployer.deploy(MyContract);
};
`.trim();
};

export const createDeploy = (backendFolder, frameName, contractName) => {
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