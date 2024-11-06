import sequelize from "../database/connection";
import { ICertificateAttributes, ICertificateDTO } from "../interfaces/ICertificate";
import { UserNationalCertificateAttributes } from "../interfaces/IUserNationalCertificate";
import CertificateModel from "../models/CertificateModel";
import TrainerModel from "../models/TrainerModel";
import UserCertificateModel from "../models/UserCertificateModel";
import UserNationalCertificateModel from "../models/UserNationalCertificateModel";


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


export const CreateCertificates = async (_trainerId: number, paths: string[]): Promise<ICertificateDTO[]> => {
    const transaction = await sequelize?.transaction();
    const files: ICertificateDTO[] = [];
    if (paths.length > 0) {
        try {
            for (const name of paths) {
                const newFile = await CertificateModel.create({
                    Name: name
                }, { transaction });
                files.push({ Id: newFile.Id, Name: newFile.Name });
            }
            for (const item of files) {
                if (item.Id) {
                    await UserCertificateModel.create({
                        certificateId: item.Id,
                        trainerId: _trainerId,
                    }, { transaction });
                }
            }
            await transaction?.commit();
            return files;

        } catch (error: any) {
            await transaction?.rollback;
            throw new Error(error);
        }
    }
    return files;
}

export const UpdateCertificates = async (paths: string[], _certificatesId: string[]): Promise<ICertificateDTO[]> => {
    const transaction = await sequelize?.transaction();
    const files: ICertificateDTO[] = [];

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
            await CertificateModel.update(
                { Name: path },
                { where: { Id: certificateId }, transaction }
            );

            // Add updated certificate info to the files array
            files.push({ Id: certificateId, Name: path });
        }

        // Commit the transaction if all updates succeed
        await transaction?.commit();
        return files;

    } catch (error: any) {
        // Rollback transaction if any update fails
        await transaction?.rollback();
        throw new Error(error);
    }
};



export const CreateNationalCertificate = async (_trainerId: number, path: string): Promise<UserNationalCertificateAttributes | null> => {
    const transaction = await sequelize?.transaction();
    try {

        const newFile = await UserNationalCertificateModel.create({
            Name: path
        }, { transaction });

        await TrainerModel.update({ NationalCertificateId: newFile.Id }, { where: { Id: _trainerId }, transaction });
        await transaction?.commit();

        return {
            Id: newFile.Id,
            Name: path
        }
    } catch (error: any) {
        await transaction?.rollback;
        throw new Error(error);
    }
}

export const UpdateNationalCertificate = async (_path: string, _nationalCertificateId: number): Promise<UserNationalCertificateAttributes | null> => {
    const transaction = await sequelize?.transaction();
    try {

        const newFile = await UserNationalCertificateModel.update(
            { Name: _path },
            {
                where: { Id: _nationalCertificateId },
                transaction,
            }
        );
        await transaction?.commit();

        return {
            Name: _path,
            Id: _nationalCertificateId
        }
    } catch (error: any) {
        await transaction?.rollback;
        throw new Error(error);
    }
}