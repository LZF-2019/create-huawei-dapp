import prompts from 'prompts';
import path from 'path';
import fs, { existsSync } from "fs";

import { onCancel, mkdir } from './common.js';
import { createContract } from '../util/contract.js';
import { createDeploy } from '../util/deploy.js';
import { createConfig } from '../util/config.js';
import { createDepend } from '../util/depend.js';
import { createTest } from '../util/test.js';
import { createEnv } from '../util/env.js';

const selectProjectName = async () => {
    const projectName = await prompts({
        type: "text",
        name: "name",
        message: "Please input the project name you want create",
        initial: "my-dapp",
    }, { onCancel }).then((data) => data.name);
    if (!existsSync(path.join(process.cwd(), projectName))) {
        mkdir(path.join(process.cwd(), projectName));
    }
    return projectName;
}

const selectProjectType = async () => {
    const projectType = await prompts({
        type: "select",
        name: "projectType",
        message: "Please select the ProjectType you want create",
        choices: [
            { title: 'Backend', value: 'Backend' },
            { title: 'Fullstack', value: 'Fullstack' , disabled: true, warn: "will be supported soon"},
        ],
    }, { onCancel }).then((data) => data.projectType);
    return projectType;
};

const selectBackendFrame = async (projectPath) => {
    if (!existsSync(path.join(projectPath, "backend"))) {
        mkdir(path.join(projectPath, "backend"));
    }
    const backendFrame = await prompts({
        type: "select",
        name: "backendFrame",
        message: "Please select the BackendFrame you want create",
        choices: [
            { title: 'Hardhat', value: 'Hardhat' },
            { title: 'Foundry', value: 'Foundry' },
            { title: 'Truffle', value: 'Truffle' , disabled: true}
        ],
    }, { onCancel }).then((data) => data.backendFrame);
    return backendFrame; 
}

const selectChainNetwork = async () => {
    const chain = await prompts({
        type: "select",
        name: "chain",
        message: "Please select the Chain you want create",
        choices: [
            { title: 'Ethereum', value: 'Ethereum' },
            { title: 'Polygon', value: 'Polygon' , disabled: true, warn: "will be supported soon"},
            { title: 'Tron', value: 'Tron' , disabled: true, warn: "will be supported soon"},
        ],
    }, { onCancel }).then((data) => data.chain);
    let networkList;
    switch (chain) {
        case 'Ethereum' :
            networkList = [
                {title: 'mainnet', value: 'ethMainnet'},
                {title: 'goerli', value: 'goerli'},
                {tile: 'sepolia', value: 'sepolia'},
            ]
            break;
        case 'Polygon' :
            networkList = [
                {title: 'mainnet', value: 'polyMainnet'},
                {title: 'testnet', value: 'polyTestnet'},
            ]
            break;
        case 'Tron' : 
            networkList = [
                {tile: 'mainnet', value: 'tronMainnet'},
            ]
    };
    const network = await prompts({
        type: "select",
        name: "network",
        message: "Please select the Network you want create",
        choices: networkList,
    }, { onCancel }).then((data) => data.network);
    return network;
};

const selectContract = async(projectPath, backendFrame, networkName) => {
    const contract = await prompts({
        type: "select",
        name: "contract",
        message: "Please select the Contract you want create",
        choices: [
            { title: 'ERC20', value: 'ERC20' },
            { title: 'ERC721', value: 'ERC721' },
            { title: 'ERC1155', value: 'ERC1155' },
            { title: 'default', value: 'default' },
        ],
    }, { onCancel }).then((data) => data.contract);
    let contractInfo;
    contractInfo = {"name": "Simple"};
    switch (contract) {
        case 'ERC20' : 
            contractInfo = await selectERC20();
            break;
        case 'ERC721' : 
            contractInfo = await selectERC721();
            break;
        case 'ERC1155' : 
            contractInfo = await selectERC1155();
            break;
        default :  
            break;
    }
    createContract(path.join(projectPath, "backend"), contract, contractInfo);
    createDeploy(path.join(projectPath, "backend"), backendFrame, contractInfo.name);
    createConfig(path.join(projectPath, "backend"), backendFrame, networkName);
    createDepend(path.join(projectPath, "backend"), backendFrame);
    createTest(path.join(projectPath, "backend"), backendFrame);
    createEnv(path.join(projectPath, "backend"), backendFrame);
};

const selectERC20 = async() => {
    const erc20 = await prompts([
        {
            type: "text",
            name: "name",
            message: "Please input the erc20 name you want create",
            initial: "MyToken",
        },
        {
            type: "text",
            name: "symbol",
            message: "Please input the erc20 symbol you want create",
            initial: "MTK",
        },
        {
            type: "number",
            name: "premint",
            message: "Please input the erc20 premint you want create",
            initial: 0,
            min: 0,
        }, 
        {
            type: "multiselect",
            name: "feature",
            message: "Please select the Feature you want create",
            choices: [
                { title: 'Mintable', value: 'Mintable' },
                { title: 'Burnable', value: 'Burnable' },
                { title: 'Pausable', value: 'Pausable' },
                { title: 'Permit', value: 'Permit' },
                { title: 'Votes', value: 'Votes' },
                { title: 'Flash Minting', value: 'Flash Minting' },
                { title: 'Snapshots', value: 'Snapshots' },
            ],
        }
    ], { onCancel });
    return erc20;
}

const selectERC721 = async() => {
    const erc721 = await prompts([
        {
            type: "text",
            name: "name",
            message: "Please input the erc721 name you want create",
            initial: "MyToken",
        },
        {
            type: "text",
            name: "symbol",
            message: "Please input the erc721 symbol you want create",
            initial: "MTK",
        },
        {
            type: "text",
            name: "uri",
            message: "Please input the erc721 uri you want create",
            initial: "https://...",
        },
        {
            type: "multiselect",
            name: "feature",
            message: "Please select the Feature you want create",
            choices: [
                { title: 'Mintable', value: 'Mintable' },
                { title: 'Burnable', value: 'Burnable' },
                { title: 'Pausable', value: 'Pausable' },
                { title: 'Votes', value: 'Votes' },
                { title: 'Enumerable', value: 'Enumerable' },
                { title: 'URI Storage', value: 'URI Storage' },
            ],
        }
    ], { onCancel });
    return erc721;
}

const selectERC1155 = async() => {
    const erc1155 = await prompts([
        {
            type: "text",
            name: "name",
            message: "Please input the erc1155 name you want create",
            initial: "MyToken",
        },
        {
            type: "text",
            name: "uri",
            message: "Please input the erc1155 uri you want create",
            initial: "https://...",
        },
        {
            type: "multiselect",
            name: "feature",
            message: "Please select the Feature you want create",
            choices: [
                { title: 'Mintable', value: 'Mintable' },
                { title: 'Burnable', value: 'Burnable' },
                { title: 'Supply Tracking', value: 'Supply Tracking' },
                { title: 'Pausable', value: 'Pausable' },
                { title: 'Updatable URI', value: 'Updatable URI' },
            ],
        }
    ], { onCancel });
    return erc1155;
}

export {selectProjectName, selectProjectType, selectBackendFrame, selectChainNetwork, selectContract};