"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const CertificateModel_1 = __importDefault(require("./CertificateModel"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
class UserCertificateModel extends sequelize_1.Model {
}
UserCertificateModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    certificateId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CertificateModel_1.default,
            key: 'Id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    trainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: TrainerModel_1.default,
            key: 'Id'
        },
        onUpdate: "SET NULL",
        onDelete: "SET NULL"
    },
}, {
    sequelize: connection_1.default,
    modelName: "usercertificate_tbl",
    tableName: "usercertificate_tbl",
    timestamps: false
});
exports.default = UserCertificateModel;
