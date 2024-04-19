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
Object.defineProperty(exports, "__esModule", { value: true });
exports.folder = exports.view = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function view(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield prisma.category.findMany({
            include: { files: true },
        });
        return res.render('index', { categories: categories });
    });
}
exports.view = view;
function folder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const folder = yield prisma.files.create({
            data: {
                categories_id: req.query.categories,
                parent_id: null,
                folder_name: req.query.name
            },
        });
        return res.redirect("/");
    });
}
exports.folder = folder;
