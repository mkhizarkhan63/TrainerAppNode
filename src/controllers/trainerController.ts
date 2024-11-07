import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { ITrainerMediaFileRequest } from "../interfaces/ITrainerMedia";
import { trainerMediaUpload } from "../services/trainerService";


type FileField = Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined;

// Extend the Express Request interface to include the custom `files` property
interface RequestWithFiles extends Request {
    files?: FileField; // Use the union type for files
}

export const UploadUserMedia = async (req: RequestWithFiles, res: Response): Promise<void> => {

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

        const obj: ITrainerMediaFileRequest = {

            trainerId: trainerId,
            emailAddress: emailAddress,
            mediaType: mediaType,
            audios: audioFilePath,
            pictures: pictureFilePath,
            videos: videoFilePath
        }
        const result = await trainerMediaUpload(obj);
        if (result)
            res.json(successResponse("Uploaded Successfully!", 200, result));
        else
            res.json(successResponse("Failed to upload!", 200, result));

    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}


// UploadTrainerMedia