import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { clientRegistration, trainerRegistration } from "../services/registrationService";
import { IClientDTO } from "../interfaces/IClient";
import { ITrainerDTO } from "../interfaces/ITrainer";
import { UserTypeEnum } from "../utils/enums";
import { uploadCertificates, uploadNationalCertificate } from "../services/certificateService";
import { userByEmailExists } from "../services/userService";

type FileField = Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined;

// Extend the Express Request interface to include the custom `files` property
interface RequestWithFiles extends Request {
    files?: FileField; // Use the union type for files
}
export const registration = async (req: RequestWithFiles, res: Response) => {
    const userExists = await userByEmailExists(req.body.emailAddress);
    //found or not
    if (!userExists) {
        if (req.body.typeId === UserTypeEnum.Trainer) {


            const nationalCertificateFile = req.files && typeof req.files === 'object' && 'nationalCertificate' in req.files
                ? req.files['nationalCertificate'][0] // Access the first file for the national certificate
                : null; // Single file for national certificate

            const certificateFiles = req.files && typeof req.files === 'object' && 'certificates' in req.files
                ? req.files['certificates'] // Array of multiple certificate files
                : []; // Default to an empty array if not found

            const nationalCertificatePath = nationalCertificateFile ? `${process.env.SERVER_URL}${nationalCertificateFile.path}` : null;
            const { nationalCertificateFileId } = await uploadNationalCertificate(nationalCertificatePath) as { message: string; nationalCertificateFileId: number };

            const certificatePaths = certificateFiles.map(file => `${process.env.SERVER_URL}${file.path}`);
            const { certificatesIds } = await uploadCertificates(certificatePaths) as { message: string, certificatesIds: number[] };

            const trainerDto: ITrainerDTO = {
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                MobileNumber: req.body.mobileNumber,
                DoB: req.body.DoB,
                Nationality: req.body.nationality,
                CountryResidence: req.body.countryResidence,
                EmailAddress: req.body.emailAddress,
                Password: req.body.password,
                GenderId: req.body.genderId,
                TypeId: req.body.typeId,
                NationalCertificateId: nationalCertificateFileId,
                LanguagesIds: req.body.LanguagesIds
            };

            try {
                const { data, message } = await trainerRegistration(trainerDto, certificatesIds);

                res.json(successResponse(message, 200, data));

            } catch (error) {
                res.json(errorResponse("Internal Server Error", 500, error));
            }
        }
        else if (req.body.typeId === UserTypeEnum.Client) {
            const clientData: IClientDTO = {
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                MobileNumber: req.body.mobileNumber,
                DoB: req.body.DoB,
                Nationality: req.body.nationality,
                CountryResidence: req.body.countryResidence,
                EmailAddress: req.body.emailAddress,
                Password: req.body.password,
                GenderId: req.body.genderId,
                TypeId: req.body.typeId,
            };
            try {
                const { data, message } = await clientRegistration(clientData);

                res.json(successResponse(message, 200, data));

            } catch (error) {
                res.json(errorResponse("Internal Server Error", 500, error));
            }
        }
    }
    else
        res.json(successResponse("User Already Exists!", 400));
};