"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.viewFile = exports.docremove = exports.remove = exports.privateFolder = exports.folder = exports.view = void 0;
const dbuilder_1 = __importDefault(require("../../helper/dbuilder"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function view(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield prisma.category.findMany({
            include: { files: {
                    include: {
                        docs: true // Include the documents related to each file
                    }
                } },
        });
        return res.render('index', { categories: categories });
    });
}
exports.view = view;
function folder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = req.query.categories;
        const name = req.query.name;
        // const type: string = req.query.type as string; 
        const build = yield prisma.file.create({
            data: {
                categories: {
                    connect: { id: +categories } // Assuming id is the primary key of the Category table
                },
                folder_name: name
            },
        });
        //  folderBuilder(categories,name)
        return res.redirect('back');
    });
}
exports.folder = folder;
function privateFolder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = req.query.categories;
        const parent = req.query.parent;
        const name = req.query.name;
        const type = req.query.type;
        if (type == 'file') {
            const build = yield prisma.file.create({
                data: {
                    categories: {
                        connect: { id: +categories } // Assuming id is the primary key of the Category table
                    },
                    parent_id: +parent,
                    folder_name: name
                },
            });
            //folderBuilder(categories,name)
        }
        else if (type == 'docs') {
            const fileName = name + '.txt';
            const build = yield prisma.docs.create({
                data: {
                    files: {
                        connect: { id: +parent } // Assuming id is the primary key of the Category table
                    },
                    type: 'txt',
                    name: fileName
                },
            });
            (0, dbuilder_1.default)(fileName);
        }
        return res.redirect('back');
    });
}
exports.privateFolder = privateFolder;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.params.id) {
            /*  const file = await prisma.file.findUnique({
                   where: {
                       id: +(req.params.id),
                   },
             }); */
            /* if(folderRemove(file.categoriesId+"/"+file.parent,file.folder_name)){
                 
            } */
            const deleteFile = yield prisma.file.delete({
                where: {
                    id: +(req.params.id),
                },
            });
            return res.redirect('back');
        }
    });
}
exports.remove = remove;
function docremove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.params.id) {
            console.log(req.params.id);
            const file = yield prisma.docs.delete({
                where: {
                    id: +(req.params.id),
                },
            });
            return res.redirect('back');
        }
    });
}
exports.docremove = docremove;
function viewFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirname = path_1.default.resolve(__filename, '../../../../'); // Use __filename instead of __dirname
        const folderPath = path_1.default.join(dirname, "storage");
        const doc = yield prisma.docs.findUnique({
            where: {
                id: +(req.params.id),
            },
        });
        const fileName = doc.name;
        const readableStream = fs_1.default.createReadStream(folderPath + "/" + fileName, { encoding: 'utf8' });
        // res.setHeader('Content-Type', 'application/json');
        readableStream.pipe(res);
    });
}
exports.viewFile = viewFile;
function saveFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirname = path_1.default.resolve(__filename, '../../../../'); // Use __filename instead of __dirname
        const folderPath = path_1.default.join(dirname, "storage");
        const doc = yield prisma.docs.findUnique({
            where: {
                id: +(req.params.id),
            },
        });
        const fileName = doc.name;
        const data = req.body.data;
        // Create a writable stream
        const writableStream = fs_1.default.createWriteStream(folderPath + "/" + fileName);
        writableStream.write(data);
        writableStream.end();
        res.json({
            status: true
        });
    });
}
exports.saveFile = saveFile;
