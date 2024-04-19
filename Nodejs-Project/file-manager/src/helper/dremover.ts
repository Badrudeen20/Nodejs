import fs from "fs"
import path  from "path"
const rootPath = process.cwd();

const docRemover = function(fileName:string):boolean {
    
      const filePath = path.join(rootPath, "storage/"+fileName);
      
      if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                  if (err) {
                        console.error('Error deleting file:', err);
                        return 
                  }
                 
            });
            return true
      }else{
            return false
      }
      /* fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                  console.error('File does not exist');
                  return 
            }
      
            // Remove the file
            fs.unlink(filePath, (err) => {
                  if (err) {
                        console.error('Error deleting file:', err);
                        return 
                  }
                 
            });
      }); */
}

export default docRemover