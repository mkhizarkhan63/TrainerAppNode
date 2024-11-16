"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTrainers = exports.DeleteUserMediaByTrainerId = exports.GetUserMediaByTrainerIdAndMediaType = exports.UploadUserMedia = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const trainerService_1 = require("../services/trainerService");
const UploadUserMedia = async (req, res) => {
    try {
        const { emailAddress, mediaType, trainerId } = req.body;
        const picturesFile = req.files && typeof req.files === 'object' && 'pictures' in req.files
            ? req.files['pictures'][0]
            : null;
        const videosFile = req.files && typeof req.files === 'object' && 'videos' in req.files
            ? req.files['videos'][0]
            : null;
        const audiosFile = req.files && typeof req.files === 'object' && 'audios' in req.files
            ? req.files['audios'][0]
            : null;
        const pictureFilePath = picturesFile ? `${process.env.SERVER_URL}${picturesFile.path}` : "";
        const videoFilePath = videosFile ? `${process.env.SERVER_URL}${videosFile.path}` : "";
        const audioFilePath = audiosFile ? `${process.env.SERVER_URL}${audiosFile.path}` : "";
        const obj = {
            trainerId: trainerId,
            emailAddress: emailAddress,
            mediaType: mediaType,
            audios: audioFilePath,
            pictures: pictureFilePath,
            videos: videoFilePath
        };
        const result = await (0, trainerService_1.trainerMediaUpload)(obj);
        if (result)
            res.json((0, responseUtils_1.successResponse)("Uploaded Successfully!", 200, result));
        else
            res.json((0, responseUtils_1.successResponse)("Failed to upload!", 200, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.UploadUserMedia = UploadUserMedia;
const GetUserMediaByTrainerIdAndMediaType = async (req, res) => {
    const { trainerId, mediaType } = req.body;
    try {
        const result = await (0, trainerService_1.getTrainerMediaByTrainerId)(trainerId, mediaType);
        if (result)
            res.json((0, responseUtils_1.successResponse)("Fetched Successfully!", 200, result));
        else
            res.json((0, responseUtils_1.successResponse)("No record found!", 200, null));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.GetUserMediaByTrainerIdAndMediaType = GetUserMediaByTrainerIdAndMediaType;
const DeleteUserMediaByTrainerId = async (req, res) => {
    const { mediaType, mediaId, trainerId } = req.body;
    try {
        (0, trainerService_1.deleteTrainerMediaByTrainerId)(trainerId, mediaType, mediaId);
        res.json((0, responseUtils_1.successResponse)("File Deleted Successfully!", 200));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.DeleteUserMediaByTrainerId = DeleteUserMediaByTrainerId;
const getAllTrainers = async (req, res) => {
    try {
        const result = await (0, trainerService_1.getAllTrainerQuery)();
        res.json((0, responseUtils_1.successResponse)("", 200, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllTrainers = getAllTrainers;
