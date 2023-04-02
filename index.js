import chalk from 'chalk';
import prompts from 'prompts';
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
    try {
        const project = await prompts({
            type: "text",
            name: "name",
            message: "Please input the project name you want create",
            initial: "my-dapp",
        });
        createDappProject(project.name);
    } catch (error) {
        console.log(error);
    }
}

main();