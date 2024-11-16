"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateClientProfile = exports.getClientProfileByClientId = exports.createOrUpdateTrainerProfile = exports.getTrainerProfileByTrainerId = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const profileService_1 = require("../services/profileService");
//#region  Trainer
const getTrainerProfileByTrainerId = async (req, res) => {
    try {
        const { trainerId } = req.body;
        const data = await (0, profileService_1.getTrainerProfileData)(trainerId);
        res.json((0, responseUtils_1.successResponse)("message", 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getTrainerProfileByTrainerId = getTrainerProfileByTrainerId;
const createOrUpdateTrainerProfile = async (req, res) => {
    try {
        const trainerProfileCreate = {
            Id: parseInt(req.body.Id),
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            MobileNumber: req.body.mobileNumber,
            DoB: req.body.DoB,
            location: req.body.location,
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
        const profilePicture = req.files && typeof req.files === 'object' && 'profilePictures' in req.files
            ? req.files['profilePictures'][0]
            : null;
        const profilePicturePath = profilePicture ? `${process.env.SERVER_URL}${profilePicture.path}` : null;
        trainerProfileCreate.profilePicture = profilePicturePath ? profilePicturePath : undefined;
        const result = await (0, profileService_1.CreateOrUpdateTrainerProfileQuery)(trainerProfileCreate);
        if (result) {
            const data = await (0, profileService_1.getTrainerProfileData)(parseInt(req.body.Id));
            res.json((0, responseUtils_1.successResponse)("Updated Successfully", 200, data));
        }
        else
            res.json((0, responseUtils_1.successResponse)("Not Updated", 400));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createOrUpdateTrainerProfile = createOrUpdateTrainerProfile;
//#endregion
//#region  Client
const getClientProfileByClientId = async (req, res) => {
    try {
        const { clientId } = req.body;
        const data = await (0, profileService_1.getClientProfileData)(clientId);
        res.json((0, responseUtils_1.successResponse)("message", 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getClientProfileByClientId = getClientProfileByClientId;
const createOrUpdateClientProfile = async (req, res) => {
    try {
        const clientProfileObj = {
            Id: parseInt(req.body.Id),
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            MobileNumber: req.body.mobileNumber,
            DoB: req.body.DoB,
            location: req.body.location,
            Nationality: req.body.nationality,
            CountryResidence: req.body.countryResidence,
            GenderId: req.body.genderId,
            Description: req.body.description,
            TypeId: req.body.typeId,
            PersonalTrainingservices: req.body.personalTrainingServicesIds,
            Specializations: req.body.specializationsIds,
        };
        const profilePicture = req.files && typeof req.files === 'object' && 'profilePictures' in req.files
            ? req.files['profilePictures'][0]
            : null;
        const profilePicturePath = profilePicture ? `${process.env.SERVER_URL}${profilePicture.path}` : null;
        clientProfileObj.profilePicture = profilePicturePath ? profilePicturePath : undefined;
        const result = await (0, profileService_1.CreateOrUpdateClientProfileQuery)(clientProfileObj);
        if (result) {
            const data = await (0, profileService_1.getClientProfileData)(parseInt(req.body.Id));
            res.json((0, responseUtils_1.successResponse)("Updated Successfully", 200, data));
        }
        else
            res.json((0, responseUtils_1.successResponse)("Not Updated", 400));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createOrUpdateClientProfile = createOrUpdateClientProfile;
//#endregion
