import chalk from 'chalk';
import { createDappProject } from './scripts/workflow/createDappProject.js'

console.log(
    chalk.red(`
     _    _ _    _    __          ________ _____    _____ _      ____  _    _ _____  
    | |  | | |  | |  /\\ \\        / /  ____|_   _|  / ____| |    / __ \\| |  | |  __ \\ 
    | |__| | |  | | /  \\ \\  /\\  / /| |__    | |   | |    | |   | |  | | |  | | |  | |
    |  __  | |  | |/ /\\ \\ \\/  \\/ / |  __|   | |   | |    | |   | |  | | |  | | |  | |
    | |  | | |__| / ____ \\  /\\  /  | |____ _| |_  | |____| |___| |__| | |__| | |__| |
    |_|  |_|\\____/_/    \\_\\/  \\/   |______|_____|  \\_____|______\\____/ \\____/|_____/ 
                    create web3 dapp from huawei cloud blockchain  
    `)
);

async function main() {
    createDappProject();

}

main();