"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const folderBuilder = function (category, fileName) {
    const dirname = path_1.default.resolve(__filename, '../../../'); // Use __filename instead of __dirname
    const folderPath = path_1.default.join(dirname, "storage", category.toString(), fileName);
    if (!fs_1.default.existsSync(folderPath)) {
        fs_1.default.mkdirSync(folderPath, { recursive: true }); // Use mkdirSync to create directories synchronously
    }
    else {
        console.log(`Folder '${folderPath}' already exists.`);
    }
};
exports.default = folderBuilder;
