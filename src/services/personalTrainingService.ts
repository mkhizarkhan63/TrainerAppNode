import sequelize from "../database/connection";
import PersonalTrainingServicesModel from "../models/PersonalTrainingServicesModel";
import UserPersonalTrainingServicesModel from "../models/UserPersonalTrainingServicesModel";
import { UserTypeEnum } from "../utils/enums";
import { ResponseDTO } from "../utils/responseUtils";

export const getAllPersonalTrainingServiceQuery = async (): Promise<ResponseDTO> => {

    try {

        const obj = await PersonalTrainingServicesModel.findAll();
        return { data: obj, message: '' }
    }
    catch (error: any) {
        throw new Error(error);
    }

}

export const getPersonalTrainingServiceByIdQuery = async (Id: number): Promise<ResponseDTO> => {
    try {
        const obj = await PersonalTrainingServicesModel.findOne(({ where: { Id: Id } }));
        let msg = "";
        if (!obj)
            msg = "Data Not Found"
        return { data: obj, message: msg }
    }
    catch (error: any) {
        throw new Error(error);
    }

}

export const createUserPersonalTrainingServiceQuery = async (_trainerId: number, _clientId: number, _typeId: string, _personalTrainingServiceIds: number[]): Promise<ResponseDTO> => {
    const transaction = await UserPersonalTrainingServicesModel.sequelize?.transaction();
    try {

        if (_typeId.toString() === UserTypeEnum.Trainer) {
            const getAllByTrainerIdExists = await UserPersonalTrainingServicesModel.findAll({ where: { TrainerId: _trainerId } });
            if (getAllByTrainerIdExists)
                await UserPersonalTrainingServicesModel.destroy({ where: { TrainerId: _trainerId } });

            for (const item of _personalTrainingServiceIds) {
                await UserPersonalTrainingServicesModel.create({
                    TrainerId: _trainerId,
                    PersonalTrainingServiceId: item,
                }, { transaction });
            }
        }
        else if (_typeId.toString() === UserTypeEnum.Client) {
            const getAllByTrainerIdExists = await UserPersonalTrainingServicesModel.findAll({ where: { ClientId: _clientId } });
            if (getAllByTrainerIdExists)
                await UserPersonalTrainingServicesModel.destroy({ where: { ClientId: _clientId } });
            for (const item of _personalTrainingServiceIds) {
                await UserPersonalTrainingServicesModel.create({
                    ClientId: _clientId,
                    PersonalTrainingServiceId: item,
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
        throw new Error(error);
    }


}


export const deleteUserPersonalTrainingByTrainerIdQuery = async (_trainerId: number): Promise<boolean> => {
    try {
        const obj = await UserPersonalTrainingServicesModel.destroy({
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

export const createUserPersonalTrainingByTrainerIdQuery = async (_PersonalTrainingservicesIds: number[], _trainerId: number) => {
    const transaction = await sequelize.transaction();

    try {
        // Use a for...of loop to await each create operation
        for (const item of _PersonalTrainingservicesIds) {
            await UserPersonalTrainingServicesModel.create(
                { PersonalTrainingServiceId: item, TrainerId: _trainerId },
                { transaction }
            );
        }

        // Commit the transaction after all operations succeed
        await transaction.commit();
        return true;
    } catch (error) {
        // Rollback the transaction if an error occurs
        await transaction.rollback();
        throw error;
    }
};
