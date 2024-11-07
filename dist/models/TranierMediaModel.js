"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
class TrainerMediaModel extends sequelize_1.Model {
}
TrainerMediaModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TrainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TrainerModel_1.default,
            key: "Id"
        }
    },
    Path: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    MediaType: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: connection_1.default,
    modelName: "trainerMedia_tbl",
    tableName: "trainerMedia_tbl",
    timestamps: false
});
exports.default = TrainerMediaModel;
