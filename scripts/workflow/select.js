import prompts from 'prompts';
import { createERC } from '../util/contract.js';
import { createDeploy } from '../util/deploy.js'
import path from 'path';
import fs, { existsSync } from "fs";
import { mkdir } from '../util/mkdir.js';

const selectProjectType = async () => {
    const type = await prompts({
        type: "select",
        name: "projectType",
        message: "Please select the ProjectType you want create",
        choices: [
            { title: 'Backend', value: 'Backend' },
            { title: 'Fullstack', value: 'Fullstack' , disabled: true, warn: "will be supported soon"},
        ],
    });
    return type.projectType;
};

const selectBackendFrame = async (projectPath) => {
    if (!existsSync(path.join(projectPath, "backend"))) {
        mkdir(path.join(process.cwd(), "backend"));
    }
    const type = await prompts({
        type: "select",
        name: "backendFrame",
        message: "Please select the BackendFrame you want create",
        choices: [
            { title: 'Hardhat', value: 'Hardhat' },
            { title: 'Foundry', value: 'Foundry' },
            { title: 'Truffle', value: 'Truffle' }
        ],
    });
    return type.backendFrame; 
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
    });
    let networkList;
    switch (chain.chain) {
        case 'Ethereum' :
            networkList = [
                {title: 'mainnet', value: 'eth-mainnet'},
                {title: 'goerli', value: 'goerli'},
                {tile: 'sepolia', value: 'sepolia'},
            ]
            break;
        case 'Polygon' :
            networkList = [
                {title: 'mainnet', value: 'poly-mainnet'},
                {title: 'testnet', value: 'poly-testnet'},
            ]
            break;
        case 'Tron' : 
            networkList = [
                {tile: 'mainnet', value: 'tron-mainnet'},
            ]
    };
    const network = await prompts({
        type: "select",
        name: "network",
        message: "Please select the Network you want create",
        choices: networkList,
    });
    return network.network;
};

const selectContract = async(backendFrame) => {
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
    });
    let erc20, erc721, erc1155, contractName;
    switch (contract.contract) {
        case 'ERC20' : 
            erc20 = await selectERC20();
            contractName = erc20.name;
            createERC(path.join(process.cwd(), "backend"), 'ERC20', erc20);
            break;
        case 'ERC721' : 
            erc721 = await selectERC721();
            contractName = erc721.name; 
            createERC(path.join(process.cwd(), "backend"), 'ERC721', erc721);
            break;
        case 'ERC1155' : 
            erc1155 = await selectERC1155();
            contractName = erc1155.name;
            createERC(path.join(process.cwd(), "backend"), 'ERC1155', erc1155);
            break;
        default : 
            break;
    }
    createDeploy(path.join(process.cwd(), "backend"), backendFrame, contractName);
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
    ]);
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
    ]);
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
    ]);
    return erc1155;
}

export {selectProjectType, selectBackendFrame, selectChainNetwork, selectContract};