import path from "path";
import fs, {existsSync} from "fs";
import { mkdir } from "./mkdir.js";

const genHardhatConfigScript = (network) => {
    return `
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const HW_TOKEN = process.env.HW_TOKEN || '';
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
};`.trim();
};

const genTruffleConfigScript = (network) => {
    return `
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const PROJECT_ID = process.env.PROJECT_ID || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const HW_TOKEN = process.env.HW_TOKEN || '';

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 7545,            // Standard Ethereum port (default: none)
            network_id: "5777",       // Any network (default: none)
        },
        ${network}: {
            provider: function() {
                return new HDWalletProvider({
                    privateKeys: [PRIVATE_KEY], 
                    providerOrUrl: ""
                })
            },
            network_id: '*',
        }
    },
    // Configure your compilers
    compilers: {
        solc: {
            version: "0.8.17", // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: {          // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 200
                },
                evmVersion: "byzantium"
            }
        }
    }
};`.trim();
};

const createConfig = (backendFolder, frameName, networkName) => {
    let content, configFile;
    switch (frameName) {
        case 'Hardhat' : 
            content = genHardhatConfigScript(networkName);
            configFile = "hardhat.config.js";
            break;
        case 'Truffle' : 
            content = genTruffleConfigScript(networkName);
            configFile = "truffle-config.js";
            break;
    }
    const writeStream = fs.createWriteStream(
		path.join(backendFolder, configFile)
	);
    writeStream.write(content);
	writeStream.end();
};

export { createConfig };