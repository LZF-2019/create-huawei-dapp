import { mkdir } from "./mkdir.js";
import fs, { existsSync } from "fs";
import path from 'path';

const genTestScript = () => {
};

const createTest = (backendFolder, frameName) => {
    const testFolder = path.join(backendFolder, "test");
	if (!existsSync(testFolder)) {
        mkdir(testFolder);
    }
};

export { createTest }