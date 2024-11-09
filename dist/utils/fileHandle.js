"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRemoved = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FileRemoved = (_filePath) => {
    const BASE_UPLOAD_PATH = path_1.default.join(process.cwd(), '');
    // // Convert URL to local file path
    const serverurl = process.env.SERVER_URL?.toString();
    if (serverurl) {
        const relativeFilePath = _filePath.replace(serverurl, '');
        const absoluteFilePath = path_1.default.join(BASE_UPLOAD_PATH, relativeFilePath);
        if (absoluteFilePath) {
            if (fs_1.default.existsSync(absoluteFilePath)) {
                fs_1.default.unlinkSync(absoluteFilePath);
                console.log(`Deleted  file: ${absoluteFilePath}`);
                return true;
            }
        }
        //     return absoluteFilePath;
    }
    return false;
};
exports.FileRemoved = FileRemoved;
