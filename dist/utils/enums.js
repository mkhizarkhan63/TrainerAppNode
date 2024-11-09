"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderNames = exports.MediaType = exports.FileMode = exports.FileType = exports.UserTypeEnum = void 0;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["Trainer"] = "1";
    UserTypeEnum["Client"] = "2";
})(UserTypeEnum || (exports.UserTypeEnum = UserTypeEnum = {}));
var FileType;
(function (FileType) {
    FileType["NationalCertificate"] = "nationalcertificate";
    FileType["Certificates"] = "certificates";
    FileType["both"] = "both";
})(FileType || (exports.FileType = FileType = {}));
var FileMode;
(function (FileMode) {
    FileMode["Create"] = "1";
    FileMode["Update"] = "2";
})(FileMode || (exports.FileMode = FileMode = {}));
var MediaType;
(function (MediaType) {
    MediaType[MediaType["PICTURE"] = 1] = "PICTURE";
    MediaType[MediaType["VIDEO"] = 2] = "VIDEO";
    MediaType[MediaType["AUDIO"] = 3] = "AUDIO";
})(MediaType || (exports.MediaType = MediaType = {}));
var FolderNames;
(function (FolderNames) {
    FolderNames["PICTURE"] = "pictures";
    FolderNames["VIDEO"] = "videos";
    FolderNames["AUDIO"] = "audios";
    FolderNames["CERTIFICATES"] = "certificates";
    FolderNames["NATIONALCERTIFICATES"] = "nationalCertificate";
})(FolderNames || (exports.FolderNames = FolderNames = {}));
