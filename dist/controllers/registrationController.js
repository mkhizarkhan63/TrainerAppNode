"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const registrationService_1 = require("../services/registrationService");
const enums_1 = require("../utils/enums");
const userService_1 = require("../services/userService");
const registration = async (req, res) => {
    const userExists = await (0, userService_1.userByEmailExists)(req.body.emailAddress);
    //found or not
    if (!userExists) {
        if (req.body.typeId === enums_1.UserTypeEnum.Trainer) {
            const trainerDto = {
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                MobileNumber: req.body.mobileNumber,
                DoB: req.body.DoB,
                location: req.body.location,
                Nationality: req.body.nationality,
                CountryResidence: req.body.countryResidence,
                EmailAddress: req.body.emailAddress,
                Password: req.body.password,
                GenderId: req.body.genderId,
                TypeId: req.body.typeId,
                LanguagesIds: req.body.LanguagesIds
            };
            try {
                const { data, message } = await (0, registrationService_1.trainerRegistration)(trainerDto);
                res.json((0, responseUtils_1.successResponse)(message, 200, data));
            }
            catch (error) {
                res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
            }
        }
        else if (req.body.typeId === enums_1.UserTypeEnum.Client) {
            const clientData = {
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                MobileNumber: req.body.mobileNumber,
                location: req.body.location,
                DoB: req.body.DoB,
                Nationality: req.body.nationality,
                CountryResidence: req.body.countryResidence,
                EmailAddress: req.body.emailAddress,
                Password: req.body.password,
                GenderId: req.body.genderId,
                TypeId: req.body.typeId,
            };
            try {
                const { data, message } = await (0, registrationService_1.clientRegistration)(clientData);
                res.json((0, responseUtils_1.successResponse)(message, 200, data));
            }
            catch (error) {
                res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
            }
        }
    }
    else
        res.json((0, responseUtils_1.successResponse)("User Already Exists!", 400));
};
exports.registration = registration;
