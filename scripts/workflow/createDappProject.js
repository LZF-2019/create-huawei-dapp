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
        createProject(projectType);
    } catch(error) {
        console.log(error);
    }
};

const createProject = async (projectType, projectPath) => {
    switch (projectType) {
        case 'Backend' : 
            const backendFrame = await selectBackendFrame(projectPath);
            const network  = await selectChainNetwork();
            await selectContract(backendFrame);
            break;
        case 'Fullstack' : 
            console.log('Fullstack');
            break;
    }
}

export { createDappProject };