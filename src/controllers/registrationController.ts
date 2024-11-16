import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { clientRegistration, trainerRegistration } from "../services/registrationService";
import { IClientDTO } from "../interfaces/IClient";
import { ITrainerRegistrationDTO } from "../interfaces/ITrainer";
import { UserTypeEnum } from "../utils/enums";
import { userByEmailExists } from "../services/userService";


export const registration = async (req: Request, res: Response) => {
    const userExists = await userByEmailExists(req.body.emailAddress);
    //found or not
    if (!userExists) {
        if (req.body.typeId === UserTypeEnum.Trainer) {


            const trainerDto: ITrainerRegistrationDTO = {
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
                const { data, message } = await trainerRegistration(trainerDto);

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