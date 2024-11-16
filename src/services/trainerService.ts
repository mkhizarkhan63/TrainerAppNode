import { ITrainerRequestDTO } from "../interfaces/ITrainer";
import TrainerModel from "../models/TrainerModel";
import sequelize from "../database/connection";
import { ITrainerMediaFileRequest, ITrainerMediaFileResponse } from "../interfaces/ITrainerMedia";
import TrainerMediaModel from "../models/TranierMediaModel";
import { MediaType } from "../utils/enums";
import { FileRemoved } from "../utils/fileHandle";


export const getAllTrainerQuery = async (): Promise<TrainerModel[]> => {
    try {
        const trainer = await TrainerModel.findAll();
        return trainer;

    } catch (error) {
        throw error;
    }
}

export const getTrainerByIdQuery = async (Id: number): Promise<TrainerModel | null> => {

    try {
        const trainer = await TrainerModel.findOne({ where: { Id: Id } });
        return trainer;

    } catch (error: any) {
        throw new Error(error);
    }

}

export const getMediaByMediaId = async (_mediaId: number) => {
    try {

        const media = await TrainerMediaModel.findOne({ where: { Id: _mediaId } });
        return media;

    } catch (error: any) {
        throw new Error(error);
    }
}

export const deleteMediaById = async (_mediaId: number) => {
    try {
        const media = await TrainerMediaModel.destroy({ where: { Id: _mediaId } });
        return media;

    } catch (error: any) {
        throw new Error(error);
    }
}

export const updateTrainerById = async (_profile: ITrainerRequestDTO, trainerId: number) => {
    try {
        if (_profile.ProfileImage) {
            const obj = await TrainerModel.update(
                {
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
                },
                {
                    where: {
                        Id: trainerId,
                    },
                },
            );

            if (obj[0] > 0)
                return true;
            else
                return false;
        }
        else {
            const obj = await TrainerModel.update(
                {
                    FirstName: _profile.FirstName,
                    LastName: _profile.LastName,
                    MobileNumber: _profile.MobileNumber,
                    DoB: _profile.DoB,
                    location: _profile.location,
                    CountryResidence: _profile.CountryResidence,
                    Description: _profile.Description,
                    Nationality: _profile.Nationality,
                    GenderId: _profile.GenderId,
                },
                {
                    where: {
                        Id: trainerId,
                    },
                },
            );

            if (obj[0] > 0)
                return true;
            else
                return false;
        }

    } catch (error) {
        throw error;
    }
}


export const createTrainer = async (_trainer: ITrainerRequestDTO) => {
    const transaction = await sequelize?.transaction();
    try {
        const obj = await TrainerModel.create({
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

    } catch (error) {
        transaction.rollback();
        throw error;
    }


}

export const trainerMediaUpload = async (_media: ITrainerMediaFileRequest) => {
    const transaction = await sequelize.transaction();
    try {
        if (MediaType.PICTURE == _media.mediaType && _media.pictures) {
            // await deleteTrainerMediaByTrainerId(_media.trainerId, _media.mediaType);
            // FileRemoved(_media.emailAddress, foldernames.PICTURE);
            const obj = await TrainerMediaModel.create({ Path: _media.pictures, MediaType: MediaType.PICTURE, TrainerId: _media.trainerId });
            transaction.commit();
            return obj;
        }
        if (MediaType.VIDEO == _media.mediaType && _media.videos) {
            // await deleteTrainerMediaByTrainerId(_media.trainerId, _media.mediaType);
            // FileRemoved(_media.emailAddress, foldernames.VIDEO);
            const obj = await TrainerMediaModel.create({ Path: _media.videos, MediaType: MediaType.VIDEO, TrainerId: _media.trainerId });
            transaction.commit();
            return obj;
        }
        if (MediaType.AUDIO == _media.mediaType && _media.audios) {
            // await deleteTrainerMediaByTrainerId(_media.trainerId, _media.mediaType);
            // FileRemoved(_media.emailAddress, foldernames.AUDIO);
            const obj = await TrainerMediaModel.create({ Path: _media.audios, MediaType: MediaType.AUDIO, TrainerId: _media.trainerId });
            transaction.commit();
            return obj;
        }
        else
            return null;


    } catch (error) {
        transaction.rollback();
        throw error;
    }
}

export const deleteTrainerMediaByTrainerId = async (_trainerId: number, _mediaType: number, _mediaId: number) => {
    try {

        const trainer = await getTrainerByIdQuery(_trainerId);

        if (_mediaType === MediaType.AUDIO) {

            if (trainer) {
                const media = await getMediaByMediaId(_mediaId);
                if (media) {
                    const result = FileRemoved(media.Path);
                    await deleteMediaById(_mediaId);
                    return result
                }
            }
        }
        if (_mediaType === MediaType.PICTURE)
            if (trainer) {
                const media = await getMediaByMediaId(_mediaId);

                if (media) {

                    const result = FileRemoved(media.Path);
                    await deleteMediaById(_mediaId);
                    return result
                }
            }
        if (_mediaType === MediaType.VIDEO)
            if (trainer) {
                const media = await getMediaByMediaId(_mediaId);
                if (media) {

                    const result = FileRemoved(media.Path);
                    await deleteMediaById(_mediaId);
                    return result
                }
            }
    } catch (error) {
        throw error;
    }
}

export const getTrainerMediaByTrainerId = async (_trianerId: number, _mediaTypeId: number) => {
    try {
        const trainer = await TrainerModel.findOne({
            where: { Id: _trianerId },
            include: [
                {
                    model: TrainerMediaModel,
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
        const obj: ITrainerMediaFileResponse = {
            trainerId: trainer.Id,
            trainerMedia: trainerMedia
        }
        return obj;
    } catch (error) {
        throw error;
    }
}

// export const updateTrainerProfilePhoto = async (_trainerId: number) => {
//     try {

//     } catch (error) {
//         throw error;
//     }
// }
