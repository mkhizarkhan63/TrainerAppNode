import { Router } from 'express';
import { auth, CheckOTP, ResendOTP } from '../controllers/authController';
import { registration } from '../controllers/registrationController';
import { uploadCertificates } from '../middleware/UploadFileMulter';
import { Request, Response } from 'express';
import multer from 'multer';
import { errorResponse } from '../utils/responseUtils';
import { getAllGenders, getAllLanguages } from '../controllers/dropdownController';
import { getAllPersonalTrainingServices, getAllSpecialization, getPersonalTrainerServiceById, getSpecializationById } from '../controllers/servicesController';
import { createUserPersonalTraining, createUserSpecialization } from '../controllers/userController';
import { getTrainerProfile } from '../controllers/profileController';
import { FileUploadController } from '../controllers/fileController';


const router = Router();

router.post('/api/auth', auth);

router.post('/api/checkotp', CheckOTP)

router.post('/api/resendotp', ResendOTP)

//public routes
router.post('/api/registration', registration);

router.get('/api/getLanguages', getAllLanguages);

router.get('/api/getGender', getAllGenders);

router.get('/api/getSpecializations', getAllSpecialization);

router.get('/api/getSpecializationById', getSpecializationById);

router.get('/api/getPersonalTrainingServices', getAllPersonalTrainingServices);
router.get('/api/getPersonalTrainingServicesById', getPersonalTrainerServiceById);

router.post('/api/createUserSpecialization', createUserSpecialization);
router.post('/api/createUserPersonalTrainingService', createUserPersonalTraining);

router.get('/api/getProfileById', getTrainerProfile);

router.post('/api/uploadFile', uploadCertificates, FileUploadController, (err: any, req: Request, res: Response, next: Function) => {
    // Handle the error from multer
    if (err instanceof multer.MulterError) {
        res.status(400).json(errorResponse(err.message, 400, null));
    } else if (err) {
        res.status(400).json(errorResponse(err.message, 400, null));
    }
    next();
});

module.exports = router;