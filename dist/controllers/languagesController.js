"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserLanguageByLanguageId = exports.getAllLanguages = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const languageService_1 = require("../services/languageService");
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
const deleteUserLanguageByLanguageId = async (req, res) => {
    try {
        const result = await (0, languageService_1.deleteUserLanguagesByLanguageIdSingleQuery)(Number(req.body.languageId));
        if (result)
            res.json((0, responseUtils_1.successResponse)("Deleted Successfully!", 200, result));
        else
            res.json((0, responseUtils_1.successResponse)("Failed to delete!", 400, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.deleteUserLanguageByLanguageId = deleteUserLanguageByLanguageId;
