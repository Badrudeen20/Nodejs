import fs from "fs"
import path  from "path"


const folderRemove =  function(category:string,fileName:string):boolean {
      const dirname = path.resolve(__filename,'../../../'); // Use __filename instead of __dirname
      const folderPath = path.join(dirname, "storage", category.toString(), fileName);
      if (fs.existsSync(folderPath)) {
            fs.rmdir(folderPath, () => {
                  console.log('folder deleted successfully!');
            });
      }
      return true
     
}

export default folderRemove