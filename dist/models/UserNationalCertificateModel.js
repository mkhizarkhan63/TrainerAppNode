"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class UserNationalCertificateModel extends sequelize_1.Model {
}
UserNationalCertificateModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    }
}, {
    sequelize: connection_1.default,
    modelName: 'nationalcertificate_tbl',
    tableName: 'nationalcertificate_tbl',
    timestamps: false,
});
exports.default = UserNationalCertificateModel;
