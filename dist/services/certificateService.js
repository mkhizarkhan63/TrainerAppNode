"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCertificateByCertificateIdQuery = exports.UpdateCertificates = exports.CreateCertificates = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const CertificateModel_1 = __importDefault(require("../models/CertificateModel"));
const UserCertificateModel_1 = __importDefault(require("../models/UserCertificateModel"));
// export const uploadNationalCertificate = async (path: string | null) => {
//     const transaction = await UserNationalCertificateModel.sequelize?.transaction();
//     if (path) {
//         try {
//             const newFile = await UserNationalCertificateModel.create({
//                 Name: path
//             }, { transaction });
//             await transaction?.commit();
//             return {
//                 message: "File Uploaded Successfully",
//                 nationalCertificateFileId: newFile.Id
//             }
//         } catch (error: any) {
//             await transaction?.rollback;
//             throw new Error(error);
//         }
//     }
//     return null
// }
// export const uploadCertificates = async (paths: string[]) => {
//     const transaction = await CertificateModel.sequelize?.transaction();
//     const fileIds: number[] = [];
//     if (paths.length > 0) {
//         try {
//             for (const name of paths) {
//                 const newFile = await CertificateModel.create({
//                     Name: name
//                 }, { transaction });
//                 fileIds.push(newFile.Id);
//             }
//             await transaction?.commit();
//             return {
//                 message: "File Uploaded Successfully",
//                 certificatesIds: fileIds
//             }
//         } catch (error: any) {
//             await transaction?.rollback;
//             throw new Error(error);
//         }
//     }
//     return fileIds;
// }
//new 
const CreateCertificates = async (_trainerId, paths) => {
    const transaction = await connection_1.default?.transaction();
    const files = [];
    if (paths.length > 0) {
        try {
            for (const name of paths) {
                const newFile = await CertificateModel_1.default.create({
                    Name: name
                }, { transaction });
                files.push({ Id: newFile.Id, Name: newFile.Name });
            }
            for (const item of files) {
                if (item.Id) {
                    await UserCertificateModel_1.default.create({
                        certificateId: item.Id,
                        trainerId: _trainerId,
                    }, { transaction });
                }
            }
            await transaction?.commit();
            return files;
        }
        catch (error) {
            await transaction?.rollback;
            throw new Error(error);
        }
    }
    return files;
};
exports.CreateCertificates = CreateCertificates;
const UpdateCertificates = async (paths, _certificatesId) => {
    const transaction = await connection_1.default?.transaction();
    const files = [];
    // Ensure the lengths of paths and _certificatesId match
    if (paths.length !== _certificatesId.length) {
        throw new Error("The number of paths and certificate IDs must match.");
    }
    try {
        // Loop through both arrays to update each certificate
        for (let i = 0; i < paths.length; i++) {
            const certificateId = parseInt(_certificatesId[i]);
            const path = paths[i];
            // Update the certificate record by ID
            await CertificateModel_1.default.update({ Name: path }, { where: { Id: certificateId }, transaction });
            // Add updated certificate info to the files array
            files.push({ Id: certificateId, Name: path });
        }
        // Commit the transaction if all updates succeed
        await transaction?.commit();
        return files;
    }
    catch (error) {
        // Rollback transaction if any update fails
        await transaction?.rollback();
        throw new Error(error);
    }
};
exports.UpdateCertificates = UpdateCertificates;
const deleteCertificateByCertificateIdQuery = async (Id) => {
    try {
        const obj = await CertificateModel_1.default.destroy({ where: { Id: Id } });
        if (obj > 0)
            return true;
        else
            return false;
    }
    catch (e) {
        throw e;
    }
};
exports.deleteCertificateByCertificateIdQuery = deleteCertificateByCertificateIdQuery;
