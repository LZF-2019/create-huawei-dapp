import fs, { existsSync } from "fs";
import path from "path";

export const onCancel = prompt => {
    throw new Error('Never stop prompting!');
}

export const onDelete = (projectName) => {
    if (existsSync(path.join(process.cwd(), projectName))) {
        deleteall(path.join(process.cwd(), projectName));
    }
}

export const mkdir = (projectPath) => {
	try {
		fs.mkdirSync(projectPath);
	} catch (e) {
		console.log(e);
	}
};

function deleteall(path) {
    var files = [];
    if(fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function(file, index) {
        var curPath = path + "/" + file;
        if(fs.statSync(curPath).isDirectory()) { // recurse
          deleteall(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
};