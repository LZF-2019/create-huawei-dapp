import { erc20, erc721, erc1155 } from "@openzeppelin/wizard";
import { mkdir } from "./mkdir.js";
import fs, { existsSync } from "fs";
import path from 'path';

const existStr = (s, strs) => {
    for (let i = 0; i < strs.length; i++) {
        if (strs[i] === s) {
            return true;
        }
    }
    return false;
}
let erc20contractTemplate, erc721contractTemplate, erc1155contractTemplate;
const genERC20Contract = (erc20Info) => {
    erc20contractTemplate = erc20.print({
        name: erc20Info.name,
        symbol: erc20Info.symbol,
        permint: erc20Info.permint,
        mintable: existStr("Mintable", erc20Info.feature),
        burnable: existStr("Burnable", erc20Info.feature),
        pausable: existStr("Pausable", erc20Info.feature),
        permit: existStr("Permit", erc20Info.feature),
        votes: existStr("Votes", erc20Info.feature),
        flashmint: existStr("Flash Minting", erc20Info.feature),
        // access: smartContractInfo.isOwnable ? "ownable" : "roles",
    });
    return erc20contractTemplate;
};

const genERC721Contract = (erc721Info) => {
    erc721contractTemplate = erc721.print({
        name: erc721Info.name,
        symbol: erc721Info.symbol,
        baseUri: erc721Info.uri,
        mintable: existStr("Mintable", erc721Info.feature),
        burnable: existStr("Burnable", erc721Info.feature),
        pausable: existStr("Pausable", erc721Info.feature),
        votes: existStr("Votes", erc721Info.feature),
        enumerable: existStr("Enumerable", erc721Info.feature),
        uriStorage: existStr("URI Storage", erc721Info.feature),
    });
    return erc721contractTemplate;
};

const genERC1155Contract = (erc1155Info) => {
    erc1155contractTemplate = erc1155.print({
        name: erc1155Info.name,
        uri: erc1155Info.uri,
        mintable: existStr("Mintable", erc1155Info.feature),
        burnable: existStr("Burnable", erc1155Info.feature),
        pausable: existStr("Pausable", erc1155Info.feature),
        supply: existStr("Supply Tracking", erc1155Info.feature),
        updatableUri: existStr("Updatable URI", erc1155Info.feature),
    });
    return erc1155contractTemplate;
}; 

const genDefaultContract = () => {
    return `
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Simple {
    uint256 private value;

    event ValueChanged(uint256 newValue);

    function set(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    function get() public view returns (uint256) {
        return value;
    }
}`.trim();
}

const createContract = (backendFolder, name, ercInfo) => {
    let template;
    switch (name) {
        case 'ERC20' : 
            template = genERC20Contract(ercInfo);
            break;
        case 'ERC721' : 
            template = genERC721Contract(ercInfo);
            break;
        case 'ERC1155' : 
            template = genERC1155Contract(ercInfo);
            break;
        case 'default' : 
            template = genDefaultContract();
            break;
    }

    const contractsFolder = path.join(backendFolder, "contracts");
	if (!existsSync(contractsFolder)) {
        mkdir(contractsFolder);
    }
	const writeStream = fs.createWriteStream(
		path.join(contractsFolder, `${ercInfo.name}.sol`)
	);
    writeStream.write(template);
	writeStream.end();
};

export { createContract }