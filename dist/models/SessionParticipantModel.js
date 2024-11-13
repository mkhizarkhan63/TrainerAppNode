"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const SessionsModel_1 = __importDefault(require("./SessionsModel"));
const ClientModel_1 = __importDefault(require("./ClientModel"));
class SessionParticipantModel extends sequelize_1.Model {
}
SessionParticipantModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ClientModel_1.default,
            key: "Id"
        }
    },
    SessionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SessionsModel_1.default,
            key: "Id"
        }
    }
}, {
    sequelize: connection_1.default,
    modelName: "sessionParticipent_tbl",
    tableName: "sessionParticipent_tbl",
    timestamps: true
});
exports.default = SessionParticipantModel;
