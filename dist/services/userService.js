"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userByEmailExists = void 0;
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const userByEmailExists = async (_emailaddress) => {
    //Email should be unique
    const existingAuth = await AuthModel_1.default.findOne({
        where: { EmailAddress: _emailaddress }
    });
    return existingAuth;
};
exports.userByEmailExists = userByEmailExists;
