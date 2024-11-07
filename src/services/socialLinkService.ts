import sequelize from "../database/connection";
import SocialLinkModel from "../models/SocialLinksModel"





export const deleteSocialLinksByTrainerId = async (_trainerId: number) => {

    try {
        const obj = await SocialLinkModel.destroy({ where: { TrainerId: _trainerId } });
        if (obj > 0)
            return true;
        else
            return false;
    } catch (error) {
        throw error
    }
}


export const createSocialLinksByTrainerId = async (_socialLinks: string[], _trainerId: number) => {

    const transaction = await sequelize?.transaction();
    try {

        for (const item of _socialLinks) {

            await SocialLinkModel.create({ SocialLink: item, TrainerId: _trainerId }, { transaction });
        }

        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}