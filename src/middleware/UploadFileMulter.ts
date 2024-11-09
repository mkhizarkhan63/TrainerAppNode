import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

// Define storage options
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        if (req.body.trainerId !== "0" && req.body.clientId !== "0")
            return cb(new Error("Provide one userId at a time."), '')
        if (!req.body.emailAddress)
            return cb(new Error("Email address is required to upload files"), '')
        const baseDir = path.join('uploads', req.body.emailAddress);
        // const uploadDir = path.join('uploads', 'certificates', req.body.emailAddress);
        let uploadDir = "";

        if (file.fieldname === 'nationalCertificate') {
            uploadDir = path.join(baseDir, 'nationalCertificate'); // Directory for national certificates
        } else if (file.fieldname === 'certificates') {
            uploadDir = path.join(baseDir, 'certificates'); // Directory for other certificates
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
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .jpg and .jpeg files are allowed!') as any, false);// Reject the file
    }
};

// Create the multer instance
const upload = multer({ storage, fileFilter });

export const uploadCertificates = upload.fields([
    { name: 'nationalCertificate', maxCount: 1 }, // For the national certificate (single upload)
    { name: 'certificates', maxCount: 10 } // For multiple certificates
]);
