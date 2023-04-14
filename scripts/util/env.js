import path from "path";
import fs from "fs";

const generateEnvFile = () => {
    return `
PRIVATE_KEY=
HUAWEI_URL=
ETHERSCAN_API_KEY=
`.trim();
}
export const createEnv = (backendFolder, frameName) => {
    if (frameName == 'Foundry') {
        return;
    }
    let content = generateEnvFile();
    let envFile = ".env";
    const writeStream = fs.createWriteStream(
		path.join(backendFolder, envFile)
	);
    writeStream.write(content);
	writeStream.end();
};