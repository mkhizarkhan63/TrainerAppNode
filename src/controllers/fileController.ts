import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { HandleFileUploadService } from "../services/uploadFileService";

type FileField = Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined;

// Extend the Express Request interface to include the custom `files` property
interface RequestWithFiles extends Request {
    files?: FileField; // Use the union type for files
}
export const FileUploadController = async (req: RequestWithFiles, res: Response) => {

    const { fileType, userType, clientId, trainerId, nationalCertificateId, certificatesIds } = req.body;

    try {


        const nationalCertificateFile = req.files && typeof req.files === 'object' && 'nationalCertificate' in req.files
            ? req.files['nationalCertificate'][0]
            : null;

        const certificateFiles = req.files && typeof req.files === 'object' && 'certificates' in req.files
            ? req.files['certificates']
            : [];

        const nationalCertificatePath = nationalCertificateFile ? `${process.env.SERVER_URL}${nationalCertificateFile.path}` : "";
        const certificatePaths = certificateFiles.map(file => `${process.env.SERVER_URL}${file.path}`);
        const certificatesIdsArr = [certificatesIds];
        const data = await HandleFileUploadService(fileType, userType, nationalCertificatePath, nationalCertificateId, certificatesIdsArr, certificatePaths, trainerId, clientId);

        res.json(successResponse("Succeed", 200, data));


    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }


};