import TrainerModel from "../models/TrainerModel";

export const getTrainerById = async (Id: number): Promise<TrainerModel | null> => {

    try {
        const trainer = await TrainerModel.findOne({ where: { Id: Id } });
        return trainer;

    } catch (error: any) {
        throw new Error(error);
    }

}


