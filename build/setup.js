import { readFile, writeFile } from 'fs';

// README.md

const readme = './README.md';

readFile(readme, 'utf8', (err, data) => {
    if (err) throw err;

    data = data.replace(/v(\d+(\.\d+)+)/g, 'v' + process.env.npm_package_version);
    data = data.replace(/@(\d+(\.\d+)+)/g, '@' + process.env.npm_package_version);

    writeFile(readme, data, 'utf8', (err) => {
        if (err) throw err;
    });

});