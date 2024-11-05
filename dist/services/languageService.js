"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLanguagesQuery = void 0;
const LanguageModel_1 = __importDefault(require("../models/LanguageModel"));
const getAllLanguagesQuery = async () => {
    try {
        const languages = await LanguageModel_1.default.findAll();
        return { data: languages, message: '' };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllLanguagesQuery = getAllLanguagesQuery;
