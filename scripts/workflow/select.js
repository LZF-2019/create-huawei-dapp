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
            { title: 'Fullstack', value: 'Fullstack' },
        ],
    });
    return type.projectType;
};

const selectBackendFrame = async () => {
    if (!existsSync(path.join(process.cwd(), "backend"))) {
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
            { title: 'Polygon', value: 'Polygon' },
            { title: 'Tron', value: 'Tron' },
        ],
    });
    let networkList;
    switch (chain.chain) {
        case 'Ethereum' :
            networkList = [
                {title: 'mainnet', value: 'mainnet'},
                {title: 'goerli', value: 'goerli'},
                {tile: 'sepolia', value: 'sepolia'},
            ]
            break;
        case 'Polygon' :
            networkList = [
                {title: 'mainnet', value: 'mainnet'},
                {title: 'testnet', value: 'testnet'},
            ]
            break;
    };
    const network = await prompts({
        type: "select",
        name: "network",
        message: "Please select the Network you want create",
        choices: networkList,
    });
    return chain.chain, network.network;
};

const selectContract = async() => {
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
    let erc20, erc721, erc1155;
    switch (contract.contract) {
        case 'ERC20' : 
            erc20 = await selectERC20();
            console.log(erc20);
            createERC(path.join(process.cwd(), "backend"), 'ERC20', erc20);
            createDeploy(path.join(process.cwd(), "backend"), "Hardhat", erc20.name);
            break;
        case 'ERC721' : 
            erc721 = await selectERC721();
            // createERC721();
            break;
        case 'ERC1155' : 
            erc1155 = await selectERC1155();
            // createERC1155();
            break;
        default : 
            break;
    }
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
    console.log(erc20['name']);
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
            name: "selectFeature",
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
            name: "selectFeature",
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