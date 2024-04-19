"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const docBuilder = function (fileName) {
    const dirname = path_1.default.resolve(__filename, '../../../'); // Use __filename instead of __dirname
    const folderPath = path_1.default.join(dirname, "storage");
    if (fs_1.default.existsSync(folderPath)) {
        fs_1.default.writeFile(folderPath + "/" + fileName, 'Welcome', (err) => {
            if (err) {
                console.error('Error creating file:', err);
            }
            else {
                console.log('File created successfully.');
            }
        });
    }
    else {
        console.log(`Folder '${folderPath}' already exists.`);
    }
};
exports.default = docBuilder;
