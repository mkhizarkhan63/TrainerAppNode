"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class CertificateModel extends sequelize_1.Model {
}
CertificateModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: "certificate_tbl",
    tableName: "certificate_tbl",
    timestamps: true
});
exports.default = CertificateModel;
