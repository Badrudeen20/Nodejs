import fs from "fs"
import path  from "path"


const folderBuilder =  function(category:string,fileName:string):void {
    const dirname = path.resolve(__filename,'../../../'); // Use __filename instead of __dirname
    const folderPath = path.join(dirname, "storage", category.toString(), fileName);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true }); // Use mkdirSync to create directories synchronously
    } else {
        console.log(`Folder '${folderPath}' already exists.`);
    }
}

export default folderBuilder