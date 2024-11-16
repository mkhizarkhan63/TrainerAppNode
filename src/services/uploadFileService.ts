import path from "path";
import { FileMode, FileType, UserTypeEnum } from "../utils/enums";
import fs from 'fs';
import dotenv from 'dotenv';
import { CreateCertificates, UpdateCertificates } from "./certificateService";
import { getTrainerByIdQuery } from "./trainerService";
import { getClientByIdQuery} from "./clientService";
import { IUserNationalCertificateDTO } from "../interfaces/IUserNationalCertificate";
import { ICertificateDTO } from "../interfaces/ICertificate";
import { CreateNationalCertificate, UpdateNationalCertificate } from "./nationalCertificateService";

dotenv.config();



type FileUploadServiceResponse = {
    nationalCertificates?: IUserNationalCertificateDTO | null,
    certificates?: ICertificateDTO[] | undefined | null,
    message: string,
    status: boolean
}

export const HandleFileUploadService = async (_fileMode: string, _fileType: string, _userType: string, _nationalCertificatePath: string, _nationalCertificateId: string = "0", _certificatesId: string[], _cerificatesPath: string[], _trainerId: string, _clientId: string)
    : Promise<FileUploadServiceResponse> => {

    const ResponseDTO: FileUploadServiceResponse = {
        nationalCertificates: {},
        certificates: [],
        message: "",
        status: false
    };

    if (_trainerId !== "0") {
        const trainer = await getTrainerByIdQuery(parseInt(_trainerId));
        if (trainer) {
            if (_userType.toLowerCase() === UserTypeEnum.Trainer) {

                //Checks filetype
                if (_fileType.toLowerCase() === FileType.NationalCertificate) {
                    const nationalcertificates = await uploadNationalCertificateQuery(_fileMode, parseInt(_trainerId), _nationalCertificateId, _nationalCertificatePath);
                    ResponseDTO.nationalCertificates = nationalcertificates;
                }
                if (_fileType.toLowerCase() === FileType.Certificates) {
                    const certificates = await uploadCertificatesQuery(_fileMode, parseInt(_trainerId), _cerificatesPath, _certificatesId);
                    ResponseDTO.certificates = certificates;
                }
                if (_fileType.toLowerCase() === FileType.both) {
                    const nationalcertificates = await uploadNationalCertificateQuery(_fileMode, parseInt(_trainerId), _nationalCertificateId, _nationalCertificatePath);
                    const certificates = await uploadCertificatesQuery(_fileMode, parseInt(_trainerId), _cerificatesPath, _certificatesId);
                    ResponseDTO.certificates = certificates;
                    ResponseDTO.nationalCertificates = nationalcertificates;
                }

                return {
                    nationalCertificates: ResponseDTO.nationalCertificates,
                    certificates: ResponseDTO.certificates,
                    message: "Succeed!",
                    status: true
                };
            }
        }

    }
    if (_clientId !== "0") {
        const client = await getClientByIdQuery(parseInt(_clientId));
        if (client) {

            if (_userType.toLowerCase() === UserTypeEnum.Client) {
                //Checks filetype
                if (_fileType.toLowerCase() === FileType.NationalCertificate) {

                    const nationalCertificates = await uploadNationalCertificateQuery(_fileMode, parseInt(_trainerId), _nationalCertificateId, _nationalCertificatePath);
                    ResponseDTO.nationalCertificates = nationalCertificates;

                }
                return {
                    nationalCertificates: ResponseDTO.nationalCertificates,
                    message: "Succeed!",
                    status: true
                };
            }
        }

    }
    return {
        message: "User does not exists!",
        status: false
    };

}


const uploadNationalCertificateQuery = async (_FileMode: string, _trainerId: number, _nationalCertificateId: string, _path: string): Promise<IUserNationalCertificateDTO | null> => {

    try {

        if (_nationalCertificateId === "0" && _FileMode.toLowerCase() === FileMode.Create) {

            const nationalCertificate = await CreateNationalCertificate(_trainerId, _path);
            return { Id: nationalCertificate?.Id, Name: nationalCertificate?.Name };
        }

        else if (_nationalCertificateId !== "0" && _FileMode.toLowerCase() === FileMode.Update) {
            // await FileRemoved(_path);
            const nationalCertificate = await UpdateNationalCertificate(_path, parseInt(_nationalCertificateId));
            return { Id: nationalCertificate?.Id, Name: nationalCertificate?.Name };
        }
        return null;
    } catch (error) {
        throw error;
    }
};


const uploadCertificatesQuery = async (_FileMode: string, _trainerId: number, _paths: string[], _certificatesId: string[]): Promise<ICertificateDTO[] | null> => {
    try {

        if (_certificatesId[0] === "0" && _FileMode.toLowerCase() === FileMode.Create) {
            // Create National Certificate ID
            const certificates = await CreateCertificates(_trainerId, _paths);
            return certificates;
        }

        else if (_certificatesId.length > 0 && _FileMode.toLowerCase() === FileMode.Update) {
            const certificates = await UpdateCertificates(_paths, _certificatesId);
            return certificates;
        }
        return null;
    } catch (error) {
        throw error;
    }
}


function FileRemoved(_urlPath: string) {
    const BASE_UPLOAD_PATH = path.join(__dirname, '../uploads');
    // Convert URL to local file path
    const serverurl = process.env.SERVER_URL?.toString();
    if (serverurl) {
        const relativeFilePath = _urlPath.replace(serverurl, '');
        const absoluteFilePath = path.join(BASE_UPLOAD_PATH, relativeFilePath);
        if (absoluteFilePath) {
            if (fs.existsSync(absoluteFilePath)) {
                fs.unlinkSync(absoluteFilePath);
                console.log(`Deleted old certificate file: ${absoluteFilePath}`);
            }
        }
        return absoluteFilePath;
    }
}