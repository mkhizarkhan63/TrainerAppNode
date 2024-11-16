"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadProfilePicture = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const enums_1 = require("../utils/enums");
// Define storage options
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!req.body.emailAddress)
            return cb(new Error("Email address is required to upload profile picture"), '');
        const baseDir = path_1.default.join('uploads', req.body.emailAddress);
        let uploadDir = "";
        if (file.fieldname === enums_1.FolderNames.PROFILEPICTURE) {
            uploadDir = path_1.default.join(baseDir, enums_1.FolderNames.PROFILEPICTURE);
        }
        // Create the user directory if it doesn't exist
        fs_1.default.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Use original name or customize as needed
        const uniqueName = Date.now() + '-' + path_1.default.basename(file.originalname);
        cb(null, uniqueName);
    }
});
// File filter to allow only .jpg and .jpeg files
const fileFilter = (req, file, cb) => {
    console.log(file.mimetype); // Log MIME type for debugging
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error('Only .jpg, .jpeg, .png images files are allowed!'), false); // Reject the file
    }
};
// Create the multer instance
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.UploadProfilePicture = upload.fields([
    { name: 'profilePictures', maxCount: 1 },
]);
