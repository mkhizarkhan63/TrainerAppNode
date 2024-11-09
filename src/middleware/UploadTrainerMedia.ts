import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { FolderNames } from '../utils/enums';

// Define storage options
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {

        if (!req.body.emailAddress)
            return cb(new Error("Email address is required to upload files"), '')
        const baseDir = path.join('uploads', req.body.emailAddress);
        let uploadDir = "";

        if (file.fieldname === FolderNames.PICTURE) {
            uploadDir = path.join(baseDir, FolderNames.PICTURE);

        } else if (file.fieldname === FolderNames.VIDEO) {
            uploadDir = path.join(baseDir, FolderNames.VIDEO);
        }
        else if (file.fieldname === FolderNames.AUDIO) {
            uploadDir = path.join(baseDir, FolderNames.AUDIO);
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
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/avi', 'video/mpeg', 'video/quicktime', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/m4a', 'audio/mp4'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .jpg, .jpeg, .png images, .mp4, .avi, .mpeg, .mov videos, and .mp3, .wav, .ogg audio files are allowed!') as any, false); // Reject the file
    }
};


// Create the multer instance
const upload = multer({ storage, fileFilter });

export const UploadTrainerMedia = upload.fields([
    { name: 'pictures', maxCount: 1 },
    { name: 'videos', maxCount: 1 },
    { name: 'audios', maxCount: 1 }
]);
