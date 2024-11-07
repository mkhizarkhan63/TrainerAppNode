
import sequelize from "../database/connection";
import { UserNationalCertificateAttributes } from "../interfaces/IUserNationalCertificate";
import TrainerModel from "../models/TrainerModel";
import UserNationalCertificateModel from "../models/UserNationalCertificateModel";

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