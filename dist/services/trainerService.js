"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrainerMediaByTrainerId = exports.deleteTrainerMediaByTrainerId = exports.trainerMediaUpload = exports.createTrainer = exports.updateTrainerById = exports.deleteMediaById = exports.getMediaByMediaId = exports.getTrainerByIdQuery = exports.getAllTrainerQuery = void 0;
const TrainerModel_1 = __importDefault(require("../models/TrainerModel"));
const connection_1 = __importDefault(require("../database/connection"));
const TranierMediaModel_1 = __importDefault(require("../models/TranierMediaModel"));
const enums_1 = require("../utils/enums");
const fileHandle_1 = require("../utils/fileHandle");
const getAllTrainerQuery = async () => {
    try {
        const trainer = await TrainerModel_1.default.findAll();
        return trainer;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllTrainerQuery = getAllTrainerQuery;
const getTrainerByIdQuery = async (Id) => {
    try {
        const trainer = await TrainerModel_1.default.findOne({ where: { Id: Id } });
        return trainer;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getTrainerByIdQuery = getTrainerByIdQuery;
const getMediaByMediaId = async (_mediaId) => {
    try {
        const media = await TranierMediaModel_1.default.findOne({ where: { Id: _mediaId } });
        return media;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getMediaByMediaId = getMediaByMediaId;
const deleteMediaById = async (_mediaId) => {
    try {
        const media = await TranierMediaModel_1.default.destroy({ where: { Id: _mediaId } });
        return media;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.deleteMediaById = deleteMediaById;
const updateTrainerById = async (_profile, trainerId) => {
    try {
        if (_profile.ProfileImage) {
            const obj = await TrainerModel_1.default.update({
                FirstName: _profile.FirstName,
                LastName: _profile.LastName,
                MobileNumber: _profile.MobileNumber,
                DoB: _profile.DoB,
                location: _profile.location,
                CountryResidence: _profile.CountryResidence,
                Description: _profile.Description,
                Nationality: _profile.Nationality,
                GenderId: _profile.GenderId,
                ProfileImage: _profile.ProfileImage
            }, {
                where: {
                    Id: trainerId,
                },
            });
            if (obj[0] > 0)
                return true;
            else
                return false;
        }
        else {
            const obj = await TrainerModel_1.default.update({
                FirstName: _profile.FirstName,
                LastName: _profile.LastName,
                MobileNumber: _profile.MobileNumber,
                DoB: _profile.DoB,
                location: _profile.location,
                CountryResidence: _profile.CountryResidence,
                Description: _profile.Description,
                Nationality: _profile.Nationality,
                GenderId: _profile.GenderId,
            }, {
                where: {
                    Id: trainerId,
                },
            });
            if (obj[0] > 0)
                return true;
            else
                return false;
        }
    }
    catch (error) {
        throw error;
    }
};
exports.updateTrainerById = updateTrainerById;
const createTrainer = async (_trainer) => {
    const transaction = await connection_1.default?.transaction();
    try {
        const obj = await TrainerModel_1.default.create({
            FirstName: _trainer.FirstName,
            LastName: _trainer.LastName,
            MobileNumber: _trainer.MobileNumber,
            location: _trainer.location ? _trainer.location : "",
            DoB: _trainer.DoB,
            Nationality: _trainer.Nationality,
            CountryResidence: _trainer.CountryResidence,
            GenderId: _trainer.GenderId ? _trainer.GenderId : 1,
            TypeId: _trainer.TypeId ? _trainer.TypeId : 1,
        }, { transaction });
        transaction.commit();
        return obj;
    }
    catch (error) {
        transaction.rollback();
        throw error;
    }
};
exports.createTrainer = createTrainer;
const trainerMediaUpload = async (_media) => {
    const transaction = await connection_1.default.transaction();
    try {
        if (enums_1.MediaType.PICTURE == _media.mediaType && _media.pictures) {
            // await deleteTrainerMediaByTrainerId(_media.trainerId, _media.mediaType);
            // FileRemoved(_media.emailAddress, foldernames.PICTURE);
            const obj = await TranierMediaModel_1.default.create({ Path: _media.pictures, MediaType: enums_1.MediaType.PICTURE, TrainerId: _media.trainerId });
            transaction.commit();
            return obj;
        }
        if (enums_1.MediaType.VIDEO == _media.mediaType && _media.videos) {
            // await deleteTrainerMediaByTrainerId(_media.trainerId, _media.mediaType);
            // FileRemoved(_media.emailAddress, foldernames.VIDEO);
            const obj = await TranierMediaModel_1.default.create({ Path: _media.videos, MediaType: enums_1.MediaType.VIDEO, TrainerId: _media.trainerId });
            transaction.commit();
            return obj;
        }
        if (enums_1.MediaType.AUDIO == _media.mediaType && _media.audios) {
            // await deleteTrainerMediaByTrainerId(_media.trainerId, _media.mediaType);
            // FileRemoved(_media.emailAddress, foldernames.AUDIO);
            const obj = await TranierMediaModel_1.default.create({ Path: _media.audios, MediaType: enums_1.MediaType.AUDIO, TrainerId: _media.trainerId });
            transaction.commit();
            return obj;
        }
        else
            return null;
    }
    catch (error) {
        transaction.rollback();
        throw error;
    }
};
exports.trainerMediaUpload = trainerMediaUpload;
const deleteTrainerMediaByTrainerId = async (_trainerId, _mediaType, _mediaId) => {
    try {
        const trainer = await (0, exports.getTrainerByIdQuery)(_trainerId);
        if (_mediaType === enums_1.MediaType.AUDIO) {
            if (trainer) {
                const media = await (0, exports.getMediaByMediaId)(_mediaId);
                if (media) {
                    const result = (0, fileHandle_1.FileRemoved)(media.Path);
                    await (0, exports.deleteMediaById)(_mediaId);
                    return result;
                }
            }
        }
        if (_mediaType === enums_1.MediaType.PICTURE)
            if (trainer) {
                const media = await (0, exports.getMediaByMediaId)(_mediaId);
                if (media) {
                    const result = (0, fileHandle_1.FileRemoved)(media.Path);
                    await (0, exports.deleteMediaById)(_mediaId);
                    return result;
                }
            }
        if (_mediaType === enums_1.MediaType.VIDEO)
            if (trainer) {
                const media = await (0, exports.getMediaByMediaId)(_mediaId);
                if (media) {
                    const result = (0, fileHandle_1.FileRemoved)(media.Path);
                    await (0, exports.deleteMediaById)(_mediaId);
                    return result;
                }
            }
    }
    catch (error) {
        throw error;
    }
};
exports.deleteTrainerMediaByTrainerId = deleteTrainerMediaByTrainerId;
const getTrainerMediaByTrainerId = async (_trianerId, _mediaTypeId) => {
    try {
        const trainer = await TrainerModel_1.default.findOne({
            where: { Id: _trianerId },
            include: [
                {
                    model: TranierMediaModel_1.default,
                    as: "TrainerMedia",
                    attributes: ["Id", "Path", "MediaType"],
                    where: { MediaType: _mediaTypeId }
                }
            ]
        });
        // If trainer not found, return null
        if (!trainer) {
            return null;
        }
        const trainerMedia = trainer.TrainerMedia.map(x => x);
        const obj = {
            trainerId: trainer.Id,
            trainerMedia: trainerMedia
        };
        return obj;
    }
    catch (error) {
        throw error;
    }
};
exports.getTrainerMediaByTrainerId = getTrainerMediaByTrainerId;
// export const updateTrainerProfilePhoto = async (_trainerId: number) => {
//     try {
//     } catch (error) {
//         throw error;
//     }
// }
