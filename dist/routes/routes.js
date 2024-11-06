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
const dropdownController_1 = require("../controllers/dropdownController");
const servicesController_1 = require("../controllers/servicesController");
const userController_1 = require("../controllers/userController");
const profileController_1 = require("../controllers/profileController");
const fileController_1 = require("../controllers/fileController");
const router = (0, express_1.Router)();
router.post('/api/auth', authController_1.auth);
router.post('/api/checkotp', authController_1.CheckOTP);
router.post('/api/resendotp', authController_1.ResendOTP);
//public routes
router.post('/api/registration', registrationController_1.registration);
router.get('/api/getLanguages', dropdownController_1.getAllLanguages);
router.get('/api/getGender', dropdownController_1.getAllGenders);
router.get('/api/getSpecializations', servicesController_1.getAllSpecialization);
router.get('/api/getSpecializationById', servicesController_1.getSpecializationById);
router.get('/api/getPersonalTrainingServices', servicesController_1.getAllPersonalTrainingServices);
router.get('/api/getPersonalTrainingServicesById', servicesController_1.getPersonalTrainerServiceById);
router.post('/api/createUserSpecialization', userController_1.createUserSpecialization);
router.post('/api/createUserPersonalTrainingService', userController_1.createUserPersonalTraining);
router.get('/api/getProfileById', profileController_1.getTrainerProfile);
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
module.exports = router;
