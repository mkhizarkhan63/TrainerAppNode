"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllActivitiesQuery = void 0;
const ActivitiesModel_1 = __importDefault(require("../models/ActivitiesModel"));
const getAllActivitiesQuery = async () => {
    try {
        const activities = ActivitiesModel_1.default.findAll();
        return activities;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllActivitiesQuery = getAllActivitiesQuery;
