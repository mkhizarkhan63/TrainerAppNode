import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { FolderNames } from '../utils/enums';

// Define storage options
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {

        if (!req.body.emailAddress)
            return cb(new Error("Email address is required to upload profile picture"), '')
        const baseDir = path.join('uploads', req.body.emailAddress);
        let uploadDir = "";

        if (file.fieldname === FolderNames.PROFILEPICTURE) {
            uploadDir = path.join(baseDir, FolderNames.PROFILEPICTURE);
        }

        // Create the user directory if it doesn't exist
        fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });

        cb(null, uploadDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        // Use original name or customize as needed
        const uniqueName = Date.now() + '-' + path.basename(file.originalname);
        cb(null, uniqueName);
    }
});

// File filter to allow only .jpg and .jpeg files
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    console.log(file.mimetype);  // Log MIME type for debugging
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .jpg, .jpeg, .png images files are allowed!') as any, false); // Reject the file
    }
};


// Create the multer instance
const upload = multer({ storage, fileFilter });

export const UploadProfilePicture = upload.fields([
    { name: 'profilePictures', maxCount: 1 },

]);
