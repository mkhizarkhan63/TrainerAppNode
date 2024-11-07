"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocialLinksByTrainerId = exports.deleteSocialLinksByTrainerId = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const SocialLinksModel_1 = __importDefault(require("../models/SocialLinksModel"));
const deleteSocialLinksByTrainerId = async (_trainerId) => {
    try {
        const obj = await SocialLinksModel_1.default.destroy({ where: { TrainerId: _trainerId } });
        if (obj > 0)
            return true;
        else
            return false;
    }
    catch (error) {
        throw error;
    }
};
exports.deleteSocialLinksByTrainerId = deleteSocialLinksByTrainerId;
const createSocialLinksByTrainerId = async (_socialLinks, _trainerId) => {
    const transaction = await connection_1.default?.transaction();
    try {
        for (const item of _socialLinks) {
            await SocialLinksModel_1.default.create({ SocialLink: item, TrainerId: _trainerId }, { transaction });
        }
        await transaction.commit();
        return true;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.createSocialLinksByTrainerId = createSocialLinksByTrainerId;
