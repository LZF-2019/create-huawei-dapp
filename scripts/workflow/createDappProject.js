import path from 'path';

import { onDelete } from './common.js';
import { selectProjectName, selectProjectType, selectBackendFrame, selectChainNetwork, selectContract } from "./select.js";

let projectName;
const createDappProject = async () => {
    try {
        projectName = await selectProjectName();
        const projectType = await selectProjectType();
        await createProject(projectType, path.join(process.cwd(), projectName));
    } catch(error) {
        onDelete(projectName);
        console.log(error);
    }
};

const createProject = async (projectType, projectPath) => {
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
}

export { createDappProject };