import { selectProjectType, selectBackendFrame, selectChainNetwork, selectContract } from "./select.js";

const createDappProject = async (projectName) => {
    try {
        const projectType = await selectProjectType();
        createProject(projectType);
    } catch(error) {

    }
};

const createProject = async (type) => {
    switch (type) {
        case 'Backend' : 
            const backendFrame = await selectBackendFrame();
            const [chain, network]  = await selectChainNetwork();
            await selectContract();
            break;
        case 'Fullstack' : 
            console.log('Fullstack');
            break;
    }
}

export { createDappProject };