import fs from "fs";

export const mkdir = (projectPath) => {
	try {
		fs.mkdirSync(projectPath);
	} catch (e) {
		console.log(e);
	}
};