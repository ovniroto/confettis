import fs, { readFile, writeFile } from "fs";
import path from "path";

// README.md

const updateREADME = () => {

    const readme = './README.md';

    readFile(readme, 'utf8', (err, data) => {
        if (err) throw err;

        data = data.replace(/v(\d+(\.\d+)+)/g, 'v' + process.env.npm_package_version);
        data = data.replace(/@(\d+(\.\d+)+)/g, '@' + process.env.npm_package_version);

        writeFile(readme, data, 'utf8', (err) => {
            if (err) throw err;
        });

    });

}

// Delete type files

const deleteTypeFiles = () => {

    const directoryPath = path.join(process.cwd(), 'lib');

    fs.readdir(directoryPath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            if (file.endsWith('.d.ts') && file !== 'types.d.ts') {
                fs.unlink(path.join(directoryPath, file), (err) => {
                    if (err) throw err;
                });
            }
        });
    });

    fs.rm(path.join(directoryPath, 'shapes'), { recursive: true, force: true }, (err) => {
        if (err) throw err;
    });

}

updateREADME()
deleteTypeFiles()
