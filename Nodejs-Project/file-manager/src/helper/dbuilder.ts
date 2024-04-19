import fs from "fs"
import path  from "path"
const rootPath = process.cwd();

const docBuilder =  function(fileName:string):boolean {
    //const dirname = path.resolve(__filename,'../../../'); // Use __filename instead of __dirname
    const filePath = path.join(rootPath, "storage/"+fileName);
    if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, 'Welcome', (err) => {
            if (err) {
                console.error('Error creating file:', err);
            } 
        });
        return true
    } else {
        console.log(`Folder '${filePath}' already exists.`);
        return false
    }
}

export default docBuilder