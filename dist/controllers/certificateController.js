"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCertificateByCertificateId = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const certificateService_1 = require("../services/certificateService");
const deleteCertificateByCertificateId = async (req, res) => {
    try {
        const result = await (0, certificateService_1.deleteCertificateByCertificateIdQuery)(Number(req.body.certificateId));
        if (result)
            res.json((0, responseUtils_1.successResponse)("Deleted Successfully!", 200, result));
        else
            res.json((0, responseUtils_1.successResponse)("Failed to delete!", 200, result));
        return;
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.deleteCertificateByCertificateId = deleteCertificateByCertificateId;
