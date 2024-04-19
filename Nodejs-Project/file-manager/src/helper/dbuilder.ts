import fs from "fs"
import path  from "path"


const docBuilder =  function(fileName:string):void {
    const dirname = path.resolve(__filename,'../../../'); // Use __filename instead of __dirname
    const folderPath = path.join(dirname, "storage");
    
    if (fs.existsSync(folderPath)) {
      fs.writeFile(folderPath+"/"+fileName, 'Welcome', (err) => {
            if (err) {
                console.error('Error creating file:', err);
            } else {
                console.log('File created successfully.');
            }
      });
    } else {
        console.log(`Folder '${folderPath}' already exists.`);
    }
}

export default docBuilder