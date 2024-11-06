"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleFileUploadService = void 0;
const path_1 = __importDefault(require("path"));
const enums_1 = require("../utils/enums");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const certificateService_1 = require("./certificateService");
const trainerService_1 = require("./trainerService");
const clientService_1 = require("./clientService");
dotenv_1.default.config();
const HandleFileUploadService = async (_fileMode, _fileType, _userType, _nationalCertificatePath, _nationalCertificateId = "0", _certificatesId, _cerificatesPath, _trainerId, _clientId) => {
    const ResponseDTO = {
        nationalCertificates: {},
        certificates: [],
        message: "",
        status: false
    };
    if (_trainerId !== "0") {
        const trainer = await (0, trainerService_1.getTrainerById)(parseInt(_trainerId));
        if (trainer) {
            if (_userType.toLowerCase() === enums_1.UserTypeEnum.Trainer) {
                //Checks filetype
                if (_fileType.toLowerCase() === enums_1.FileType.NationalCertificate) {
                    const nationalcertificates = await uploadNationalCertificateQuery(_fileMode, parseInt(_trainerId), _nationalCertificateId, _nationalCertificatePath);
                    ResponseDTO.nationalCertificates = nationalcertificates;
                }
                if (_fileType.toLowerCase() === enums_1.FileType.Certificates) {
                    const certificates = await uploadCertificatesQuery(_fileMode, parseInt(_trainerId), _cerificatesPath, _certificatesId);
                    ResponseDTO.certificates = certificates;
                }
                if (_fileType.toLowerCase() === enums_1.FileType.both) {
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
        const client = await (0, clientService_1.getClientById)(parseInt(_clientId));
        if (client) {
            if (_userType.toLowerCase() === enums_1.UserTypeEnum.Client) {
                //Checks filetype
                if (_fileType.toLowerCase() === enums_1.FileType.NationalCertificate) {
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
};
exports.HandleFileUploadService = HandleFileUploadService;
const uploadNationalCertificateQuery = async (_FileMode, _trainerId, _nationalCertificateId, _path) => {
    try {
        if (_nationalCertificateId === "0" && _FileMode.toLowerCase() === enums_1.FileMode.Create) {
            const nationalCertificate = await (0, certificateService_1.CreateNationalCertificate)(_trainerId, _path);
            return { Id: nationalCertificate?.Id, Name: nationalCertificate?.Name };
        }
        else if (_nationalCertificateId !== "0" && _FileMode.toLowerCase() === enums_1.FileMode.Update) {
            // await FileRemoved(_path);
            const nationalCertificate = await (0, certificateService_1.UpdateNationalCertificate)(_path, parseInt(_nationalCertificateId));
            return { Id: nationalCertificate?.Id, Name: nationalCertificate?.Name };
        }
        return null;
    }
    catch (error) {
        throw error;
    }
};
const uploadCertificatesQuery = async (_FileMode, _trainerId, _paths, _certificatesId) => {
    try {
        if (_certificatesId[0] === "0" && _FileMode.toLowerCase() === enums_1.FileMode.Create) {
            // Create National Certificate ID
            const certificates = await (0, certificateService_1.CreateCertificates)(_trainerId, _paths);
            return certificates;
        }
        else if (_certificatesId.length > 0 && _FileMode.toLowerCase() === enums_1.FileMode.Update) {
            const certificates = await (0, certificateService_1.UpdateCertificates)(_paths, _certificatesId);
            return certificates;
        }
        return null;
    }
    catch (error) {
        throw error;
    }
};
function FileRemoved(_urlPath) {
    const BASE_UPLOAD_PATH = path_1.default.join(__dirname, '../uploads');
    // Convert URL to local file path
    const serverurl = process.env.SERVER_URL?.toString();
    if (serverurl) {
        const relativeFilePath = _urlPath.replace(serverurl, '');
        const absoluteFilePath = path_1.default.join(BASE_UPLOAD_PATH, relativeFilePath);
        if (absoluteFilePath) {
            if (fs_1.default.existsSync(absoluteFilePath)) {
                fs_1.default.unlinkSync(absoluteFilePath);
                console.log(`Deleted old certificate file: ${absoluteFilePath}`);
            }
        }
        return absoluteFilePath;
    }
}
