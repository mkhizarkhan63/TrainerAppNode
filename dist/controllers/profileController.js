"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrainerProfile = exports.getTrainerProfile = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const profileService_1 = require("../services/profileService");
const getTrainerProfile = async (req, res) => {
    try {
        const { trainerId } = req.body;
        const data = await (0, profileService_1.getTrainerProfileData)(trainerId);
        res.json((0, responseUtils_1.successResponse)("message", 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getTrainerProfile = getTrainerProfile;
const createTrainerProfile = async (req, res) => {
    try {
        const trainerProfileCreate = {
            Id: req.body.id,
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            MobileNumber: req.body.mobileNumber,
            DoB: req.body.DoB,
            Nationality: req.body.nationality,
            CountryResidence: req.body.countryResidence,
            GenderId: req.body.genderId,
            Description: req.body.description,
            TypeId: req.body.typeId,
            PersonalTrainingservices: req.body.personalTrainingServicesIds,
            Specializations: req.body.specializationsIds,
            Languages: req.body.languagesIds,
            SocialLinks: req.body.socialLinks
        };
        const result = await (0, profileService_1.CreateOrUpdateTrainerProfileQuery)(trainerProfileCreate);
        if (result) {
            const data = await (0, profileService_1.getTrainerProfileData)(req.body.id);
            res.json((0, responseUtils_1.successResponse)("Updated Successfully", 200, data));
        }
        else
            res.json((0, responseUtils_1.successResponse)("Not Updated", 400));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createTrainerProfile = createTrainerProfile;
