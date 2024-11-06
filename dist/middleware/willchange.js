"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCertificates = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Define storage options
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!req.body.emailAddress)
            return cb(new Error("Email address is required to upload files"), '');
        const baseDir = path_1.default.join('uploads', req.body.emailAddress);
        // const uploadDir = path.join('uploads', 'certificates', req.body.emailAddress);
        let uploadDir = "";
        if (file.fieldname === 'nationalCertificate') {
            uploadDir = path_1.default.join(baseDir, 'nationalCertificate'); // Directory for national certificates
        }
        else if (file.fieldname === 'certificates') {
            uploadDir = path_1.default.join(baseDir, 'certificates'); // Directory for other certificates
        }
        // Create the user directory if it doesn't exist
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
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
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error('Only .jpg and .jpeg files are allowed!'), false); // Reject the file
    }
};
// Create the multer instance
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.uploadCertificates = upload.fields([
    { name: 'nationalCertificate', maxCount: 1 }, // For the national certificate (single upload)
    { name: 'certificates', maxCount: 10 } // For multiple certificates
]);
