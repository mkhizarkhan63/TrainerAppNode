import e from "express";
import { ITrainerRequestDTO } from "../interfaces/ITrainer";
import TrainerModel from "../models/TrainerModel";
import sequelize from "../database/connection";

export const getTrainerById = async (Id: number): Promise<TrainerModel | null> => {

    try {
        const trainer = await TrainerModel.findOne({ where: { Id: Id } });
        return trainer;

    } catch (error: any) {
        throw new Error(error);
    }

}


export const updateTrainerById = async (_profile: ITrainerRequestDTO, trainerId: number) => {
    try {
        const obj = await TrainerModel.update(
            {
                FirstName: _profile.FirstName,
                LastName: _profile.LastName,
                MobileNumber: _profile.MobileNumber,
                DoB: _profile.DoB,
                CountryResidence: _profile.CountryResidence,
                Description: _profile.Description,
                Nationality: _profile.Nationality,
                GenderId: _profile.GenderId
            },
            {
                where: {
                    Id: trainerId,
                },
            },
        );

        if (obj[0] > 0)
            return true;
        else
            return false;

    } catch (error) {
        throw error;
    }
}


export const createTrainer = async (_trainer: ITrainerRequestDTO) => {
    const transaction = await sequelize?.transaction();
    try {
        const obj = await TrainerModel.create({
            FirstName: _trainer.FirstName,
            LastName: _trainer.LastName,
            MobileNumber: _trainer.MobileNumber,
            DoB: _trainer.DoB,
            Nationality: _trainer.Nationality,
            CountryResidence: _trainer.CountryResidence,
            GenderId: _trainer.GenderId ? _trainer.GenderId : 1,
            TypeId: _trainer.TypeId ? _trainer.TypeId : 1,
        }, { transaction });

        transaction.commit();
        return obj;

    } catch (error) {
        transaction.rollback();
        throw error;
    }


}
