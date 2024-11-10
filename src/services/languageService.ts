import LanguageModel from "../models/LanguageModel";
import UserLanguageModel from "../models/UserLanguagesModel";
import { ResponseDTO } from "../utils/responseUtils";
import sequelize from "../database/connection";

export const getAllLanguagesQuery = async (): Promise<ResponseDTO> => {

    try {

        const languages = await LanguageModel.findAll();
        return { data: languages, message: '' }
    }
    catch (error: any) {
        throw new Error(error);
    }


}

export const deleteUserLangugagesByTrainerId = async (_trainerId: number) => {

    try {
        const obj = await UserLanguageModel.destroy({ where: { TrainerId: _trainerId } });
        if (obj > 0)
            return true;
        else
            return false
    }
    catch (error) {
        throw error;
    }
}

export const createUserLanguagesByTrainerId = async (_langaugesIds: number[], _trainerId: number) => {
    const transaction = await sequelize?.transaction();
    try {

        for (const item of _langaugesIds) {

            await UserLanguageModel.create({ LanguageId: item, TrainerId: _trainerId }, { transaction });
        }

        await transaction.commit();
        return true;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}


export const deleteUserLanguagesByLanguageIdSingleQuery = async (Id: number) => {
    try {
        const obj = await UserLanguageModel.destroy({ where: { LanguageId: Id } });
        if (obj > 0)
            return true;
        else
            return false
    } catch (error) {

    }
}