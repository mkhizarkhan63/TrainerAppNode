"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const registrationController_1 = require("../controllers/registrationController");
const UploadFileMulter_1 = require("../middleware/UploadFileMulter");
const multer_1 = __importDefault(require("multer"));
const responseUtils_1 = require("../utils/responseUtils");
const gendersController_1 = require("../controllers/gendersController");
const profileController_1 = require("../controllers/profileController");
const fileController_1 = require("../controllers/fileController");
const languagesController_1 = require("../controllers/languagesController");
const personalTrainingController_1 = require("../controllers/personalTrainingController");
const specializationController_1 = require("../controllers/specializationController");
const certificateController_1 = require("../controllers/certificateController");
const trainerController_1 = require("../controllers/trainerController");
const UploadTrainerMedia_1 = require("../middleware/UploadTrainerMedia");
const reviewRatingController_1 = require("../controllers/reviewRatingController");
const activitiesController_1 = require("../controllers/activitiesController");
const sessionsController_1 = require("../controllers/sessionsController");
const StripeController_1 = require("../controllers/StripeController");
const clientController_1 = require("../controllers/clientController");
const UploadProfilePicture_1 = require("../middleware/UploadProfilePicture");
const router = (0, express_1.Router)();
router.post('/api/auth', authController_1.auth);
router.post('/api/checkotp', authController_1.CheckOTP);
router.post('/api/resendotp', authController_1.ResendOTP);
//public routes
//#region GET
router.get('/api/getLanguages', languagesController_1.getAllLanguages);
router.get('/api/getGender', gendersController_1.getAllGenders);
router.get('/api/getSpecializations', specializationController_1.getAllSpecialization);
router.get('/api/getSpecializationById', specializationController_1.getSpecializationById);
router.get('/api/getPersonalTrainingServices', personalTrainingController_1.getAllPersonalTrainingServices);
router.get('/api/getPersonalTrainingServicesById', personalTrainingController_1.getPersonalTrainerServiceById);
router.get('/api/getProfileById', profileController_1.getTrainerProfileByTrainerId);
router.get('/api/getUserMediaByTrainerIdAndMediaType', trainerController_1.GetUserMediaByTrainerIdAndMediaType);
router.get('/api/getAllRatingsByTrainerId', reviewRatingController_1.getAllRatingsByTrainerId);
router.get('/api/getAllActivities', activitiesController_1.getAllActivities);
router.get('/api/getMySessionDetailsById', sessionsController_1.getMySessionDetailsById);
router.get('/api/getAllSessionDetailById', sessionsController_1.getAllSessionDetailById);
router.get('/api/getClientProfileById', profileController_1.getClientProfileByClientId);
router.get('/api/getAllClients', clientController_1.getAllClients);
router.get('/api/getAllTrainers', trainerController_1.getAllTrainers);
//#endregion
//#region POST 
router.post('/api/registration', registrationController_1.registration);
router.post('/api/createUserSpecialization', specializationController_1.createUserSpecialization);
router.post('/api/createUserPersonalTrainingService', personalTrainingController_1.createUserPersonalTraining);
router.post('/api/createOrUpdateTrainerProfile', UploadProfilePicture_1.UploadProfilePicture, profileController_1.createOrUpdateTrainerProfile, (err, req, res, next) => {
    // Handle the error from multer
    if (err instanceof multer_1.default.MulterError) {
        res.status(400).json((0, responseUtils_1.errorResponse)(err.message, 400, null));
    }
    else if (err) {
        res.status(400).json((0, responseUtils_1.errorResponse)(err.message, 400, null));
    }
    next();
});
router.post('/api/uploadFile', UploadFileMulter_1.uploadCertificates, fileController_1.FileUploadController, (err, req, res, next) => {
    // Handle the error from multer
    if (err instanceof multer_1.default.MulterError) {
        res.status(400).json((0, responseUtils_1.errorResponse)(err.message, 400, null));
    }
    else if (err) {
        res.status(400).json((0, responseUtils_1.errorResponse)(err.message, 400, null));
    }
    next();
});
router.post('/api/UploadTrainerMedia', UploadTrainerMedia_1.UploadTrainerMedia, trainerController_1.UploadUserMedia, (err, req, res, next) => {
    // Handle the error from multer
    if (err instanceof multer_1.default.MulterError) {
        res.status(400).json((0, responseUtils_1.errorResponse)(err.message, 400, null));
    }
    else if (err) {
        res.status(400).json((0, responseUtils_1.errorResponse)(err.message, 400, null));
    }
    next();
});
router.post('/api/createRatingToTrainerByClientId', reviewRatingController_1.createRatingToTrainer);
router.post('/api/createSessions', sessionsController_1.createSessions);
router.post('/api/createBookingSession', sessionsController_1.createBookingSession);
router.post('/api/updateSessionById', sessionsController_1.updateSessionById);
router.post('/api/createPayment', StripeController_1.createPayment);
router.post('/api/createOrUpdateClientProfile', UploadProfilePicture_1.UploadProfilePicture, profileController_1.createOrUpdateClientProfile, (err, req, res, next) => {
    // Handle the error from multer
    if (err instanceof multer_1.default.MulterError) {
        res.status(400).json((0, responseUtils_1.errorResponse)(err.message, 400, null));
    }
    else if (err) {
        res.status(400).json((0, responseUtils_1.errorResponse)(err.message, 400, null));
    }
    next();
});
//#endregion
//#region  DELETE
router.delete('/api/deleteUserLanguageByLanguageId', languagesController_1.deleteUserLanguageByLanguageId);
router.delete('/api/deleteCertificateByCertificateId', certificateController_1.deleteCertificateByCertificateId);
router.delete('/api/deleteUserMediaByTrainerId', trainerController_1.DeleteUserMediaByTrainerId);
router.delete('/api/deleteSessionById', sessionsController_1.deleteSessionById);
//#endregion
module.exports = router;
