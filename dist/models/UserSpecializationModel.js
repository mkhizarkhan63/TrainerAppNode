"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
const SpecializationModel_1 = __importDefault(require("./SpecializationModel"));
const ClientModel_1 = __importDefault(require("./ClientModel"));
class UserSpecializationModel extends sequelize_1.Model {
}
UserSpecializationModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    TrainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: TrainerModel_1.default,
            key: 'Id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    },
    SpecializationId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: SpecializationModel_1.default,
            key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    ClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ClientModel_1.default,
            key: 'Id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    }
}, {
    sequelize: connection_1.default,
    tableName: "user_specialization_tbl",
    modelName: "user_specialization_tbl",
    timestamps: false
});
exports.default = UserSpecializationModel;
