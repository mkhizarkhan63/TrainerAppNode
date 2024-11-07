import sequelize from "../database/connection";
import SpecializationModel from "../models/SpecializationModel";
import UserSpecializationModel from "../models/UserSpecializationModel";
import { UserTypeEnum } from "../utils/enums";
import { ResponseDTO } from "../utils/responseUtils";

export const getAllSpecializationQuery = async (): Promise<ResponseDTO> => {

    try {

        const obj = await SpecializationModel.findAll();
        return { data: obj, message: '' }
    }
    catch (error: any) {
        throw new Error(error);
    }

}

export const getSpecializationByIdQuery = async (Id: number): Promise<ResponseDTO> => {
    try {
        const obj = await SpecializationModel.findOne(({ where: { Id: Id } }));
        let msg = "";
        if (!obj)
            msg = "Data Not Found"
        return { data: obj, message: msg }
    }
    catch (error: any) {
        throw new Error(error);
    }

}


export const deleteUserSpecializationByTrainerIdQuery = async (_trainerId: number): Promise<boolean> => {

    try {
        const obj = await UserSpecializationModel.destroy({
            where: {
                TrainerId: _trainerId
            },
        });
        if (obj > 0)
            return true;
        else
            return false;

    } catch (error) {
        throw error;
    }

}

export const createUserSpecializationByTrainerIdQuery = async (_specializationIds: number[], _trainerId: number) => {
    const transaction = await sequelize?.transaction();
    try {

        for (const item of _specializationIds) {

            await UserSpecializationModel.create({ SpecializationId: item, TrainerId: _trainerId }, { transaction });
        }


        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

export const createUserSpecializationQuery = async (_trainerId: number, _clientId: number, _typeId: string, _specializationIds: number[]): Promise<ResponseDTO> => {
    const transaction = await UserSpecializationModel.sequelize?.transaction();
    try {

        if (_typeId.toString() === UserTypeEnum.Trainer) {
            const getAllByTrainerIdExists = await UserSpecializationModel.findAll({ where: { TrainerId: _trainerId } });

            if (getAllByTrainerIdExists) {
                await UserSpecializationModel.destroy({ where: { TrainerId: _trainerId } });
            }

            for (const item of _specializationIds) {
                await UserSpecializationModel.create({
                    TrainerId: _trainerId,
                    SpecializationId: item,
                }, { transaction });
            }
        }
        else if (_typeId.toString() === UserTypeEnum.Client) {
            const getAllByTrainerIdExists = await UserSpecializationModel.findAll({ where: { ClientId: _clientId } });

            if (getAllByTrainerIdExists) {
                await UserSpecializationModel.destroy({ where: { ClientId: _clientId } });
            }

            for (const item of _specializationIds) {
                await UserSpecializationModel.create({
                    ClientId: _clientId,
                    SpecializationId: item,
                }, { transaction });
            }
        }
        else {
            return { data: "", message: "Something went wrong!" }
        }
        await transaction?.commit();
        return { data: "", message: "Save Successfully" }
    }
    catch (error: any) {
        await transaction?.rollback();
        throw new Error(error);
    }
}