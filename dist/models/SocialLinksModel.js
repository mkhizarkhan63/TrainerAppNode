"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
class SocialLinkModel extends sequelize_1.Model {
}
SocialLinkModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    SocialLink: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    TrainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: TrainerModel_1.default,
            key: 'Id'
        }
    }
}, {
    sequelize: connection_1.default,
    modelName: "socialLinks_tbl",
    tableName: "socialLinks_tbl",
    timestamps: false
});
exports.default = SocialLinkModel;
