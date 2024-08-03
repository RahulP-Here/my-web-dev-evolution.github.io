// Clear the clutter
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname,"\n", __filename);


const basepath = path.dirname(__dirname);

let files = fs.readdirSync(basepath);
for (const file of files) {

    let extension = file.split('.')[file.split('.').length - 1]
    // console.log(extension);
    // if (extension != 'js' && extension != 'json' && extension != 'ini' && file.split('.').length > 1) {
    if (extension != 'ini' && file.split('.').length > 1) {

        let folderName = extension
        if (!(fs.existsSync(`${basepath}/${folderName}`))) {

            fs.mkdirSync(`${basepath}/${folderName}`);
            console.log(` > Successfully Created ${folderName} Folder`);

        }
        // Move the files
        fs.rename(`${basepath}/${file}`, `${basepath}/${folderName}/${file}`, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`   --> Successfully Move ${file} to Folder ${folderName}`);

            }
        });
    }
    
}



