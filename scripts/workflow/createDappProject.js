import path from 'path';
import { existsSync } from 'fs';
import { mkdir } from '../util/mkdir.js';
import { selectProjectType, selectBackendFrame, selectChainNetwork, selectContract } from "./select.js";

const createDappProject = async (projectName) => {
    try {
        const projectType = await selectProjectType();
        if (!existsSync(path.join(process.cwd(), projectName))) {
            mkdir(path.join(process.cwd(), projectName));
        }
        createProject(projectType, path.join(process.cwd(), projectName));
    } catch(error) {
        console.log(error);
    }
};

const createProject = async (projectType, projectPath) => {
    try {
        switch (projectType) {
            case 'Backend' : 
                const backendFrame = await selectBackendFrame(projectPath);
                const networkName  = await selectChainNetwork();
                await selectContract(projectPath, backendFrame, networkName);
                break;
            case 'Fullstack' : 
                console.log('Fullstack');
                break;
        }
    } catch (error) {
        console.log(error);
    }
    
}

export { createDappProject };