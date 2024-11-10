import { Router } from 'express';
import { auth, CheckOTP, ResendOTP } from '../controllers/authController';
import { registration } from '../controllers/registrationController';
import { uploadCertificates } from '../middleware/UploadFileMulter';
import { Request, Response } from 'express';
import multer from 'multer';
import { errorResponse } from '../utils/responseUtils';
import { getAllGenders } from '../controllers/gendersController';
import { createTrainerProfile, getTrainerProfile } from '../controllers/profileController';
import { FileUploadController } from '../controllers/fileController';
import { deleteUserLanguageByLanguageId, getAllLanguages } from '../controllers/languagesController';
import { createUserPersonalTraining, getAllPersonalTrainingServices, getPersonalTrainerServiceById } from '../controllers/personalTrainingController';
import { createUserSpecialization, getAllSpecialization, getSpecializationById } from '../controllers/specializationController';
import { deleteCertificateByCertificateId } from '../controllers/certificateController';
import { DeleteUserMediaByTrainerId, GetUserMediaByTrainerIdAndMediaType, UploadUserMedia } from '../controllers/trainerController';
import { UploadTrainerMedia } from '../middleware/UploadTrainerMedia';
import { createRatingToTrainer, getAllRatingsByTrainerId } from '../controllers/reviewRatingController';
import { getAllActivities } from '../controllers/activitiesController';


const router = Router();

router.post('/api/auth', auth);

router.post('/api/checkotp', CheckOTP)

router.post('/api/resendotp', ResendOTP)

//public routes


//#region GET
router.get('/api/getLanguages', getAllLanguages);
router.get('/api/getGender', getAllGenders);
router.get('/api/getSpecializations', getAllSpecialization);
router.get('/api/getSpecializationById', getSpecializationById);
router.get('/api/getPersonalTrainingServices', getAllPersonalTrainingServices);
router.get('/api/getPersonalTrainingServicesById', getPersonalTrainerServiceById);
router.get('/api/getProfileById', getTrainerProfile);
router.get('/api/getUserMediaByTrainerIdAndMediaType', GetUserMediaByTrainerIdAndMediaType);
router.get('/api/getAllRatingsByTrainerId', getAllRatingsByTrainerId);
router.get('/api/getAllActivities', getAllActivities);
//#endregion


//#region POST 
router.post('/api/registration', registration);
router.post('/api/createUserSpecialization', createUserSpecialization);
router.post('/api/createUserPersonalTrainingService', createUserPersonalTraining);
router.post('/api/createTrainerProfile', createTrainerProfile);
router.post('/api/uploadFile', uploadCertificates, FileUploadController, (err: any, req: Request, res: Response, next: Function) => {
    // Handle the error from multer
    if (err instanceof multer.MulterError) {
        res.status(400).json(errorResponse(err.message, 400, null));
    } else if (err) {
        res.status(400).json(errorResponse(err.message, 400, null));
    }
    next();
});

router.post('/api/UploadTrainerMedia', UploadTrainerMedia, UploadUserMedia, (err: any, req: Request, res: Response, next: Function) => {
    // Handle the error from multer
    if (err instanceof multer.MulterError) {
        res.status(400).json(errorResponse(err.message, 400, null));
    } else if (err) {
        res.status(400).json(errorResponse(err.message, 400, null));
    }
    next();
});

router.post('/api/createRatingToTrainerByClientId', createRatingToTrainer);
//#endregion



//#region  DELETE
router.delete('/api/deleteUserLanguageByLanguageId', deleteUserLanguageByLanguageId);
router.delete('/api/deleteCertificateByCertificateId', deleteCertificateByCertificateId);
router.delete('/api/deleteUserMediaByTrainerId', DeleteUserMediaByTrainerId);

//#endregion



module.exports = router;