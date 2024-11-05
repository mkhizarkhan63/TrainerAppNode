"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGenders = exports.getAllLanguages = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const languageService_1 = require("../services/languageService");
const genderService_1 = require("../services/genderService");
const getAllLanguages = async (req, res) => {
    try {
        const { data, message } = await (0, languageService_1.getAllLanguagesQuery)();
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
        return;
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllLanguages = getAllLanguages;
const getAllGenders = async (req, res) => {
    try {
        const { data, message } = await (0, genderService_1.getAllGendersQuery)();
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
        return;
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllGenders = getAllGenders;
