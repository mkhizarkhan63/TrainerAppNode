"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const LanguageModel_1 = __importDefault(require("./LanguageModel"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
const ClientModel_1 = __importDefault(require("./ClientModel"));
class UserLanguageModel extends sequelize_1.Model {
}
UserLanguageModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    LanguageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: LanguageModel_1.default,
            key: 'Id'
        }
    },
    TrainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: TrainerModel_1.default,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
    },
    ClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ClientModel_1.default,
            key: 'Id'
        },
        defaultValue: null,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
    },
}, {
    sequelize: connection_1.default,
    modelName: "user_languages_tbl",
    tableName: "user_languages_tbl",
    timestamps: false
});
exports.default = UserLanguageModel;
