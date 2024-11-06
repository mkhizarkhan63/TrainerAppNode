"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadController = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const uploadFileService_1 = require("../services/uploadFileService");
const FileUploadController = async (req, res) => {
    const { fileType, userType, clientId, trainerId, nationalCertificateId, certificatesIds, fileMode } = req.body;
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
        const data = await (0, uploadFileService_1.HandleFileUploadService)(fileMode, fileType, userType, nationalCertificatePath, nationalCertificateId, certificatesIdsArr, certificatePaths, trainerId, clientId);
        res.json((0, responseUtils_1.successResponse)("Succeed", 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.FileUploadController = FileUploadController;
