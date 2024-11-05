"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const PersonalTrainingServicesModel_1 = __importDefault(require("./PersonalTrainingServicesModel"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
const ClientModel_1 = __importDefault(require("./ClientModel"));
class TrainerPersonalTrainingServicesModel extends sequelize_1.Model {
}
TrainerPersonalTrainingServicesModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PersonalTrainingServiceId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: PersonalTrainingServicesModel_1.default,
            key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    TrainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: TrainerModel_1.default,
            key: 'Id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    },
    ClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ClientModel_1.default,
            key: 'Id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    }
}, { sequelize: connection_1.default,
    modelName: 'user_personaltrainservice_tbl',
    tableName: 'user_personaltrainservice_tbl',
    timestamps: false
});
exports.default = TrainerPersonalTrainingServicesModel;
