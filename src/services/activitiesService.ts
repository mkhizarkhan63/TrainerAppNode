import ActivitesModel from "../models/ActivitiesModel";



export const getAllActivitiesQuery = async () => {
    try {

        const activities = ActivitesModel.findAll();
        return activities;

    } catch (error) {
        throw error;
    }
}

