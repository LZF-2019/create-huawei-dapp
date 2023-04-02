import fs, { existsSync } from "fs";
import path from 'path';

import { mkdir } from "../workflow/common.js";

const genTestScript = () => {
};

export const createTest = (backendFolder, frameName) => {
    const testFolder = path.join(backendFolder, "test");
	if (!existsSync(testFolder)) {
        mkdir(testFolder);
    }
};