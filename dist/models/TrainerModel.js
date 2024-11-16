"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const GenderModel_1 = __importDefault(require("./GenderModel"));
const TypeModel_1 = __importDefault(require("./TypeModel"));
const UserNationalCertificateModel_1 = __importDefault(require("./UserNationalCertificateModel"));
class TrainerModel extends sequelize_1.Model {
}
TrainerModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    MobileNumber: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    DoB: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    CountryResidence: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    Nationality: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    Description: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: true
    },
    GenderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GenderModel_1.default,
            key: 'Id'
        }
    },
    location: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    TypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeModel_1.default,
            key: 'Id'
        }
    },
    NationalCertificateId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: UserNationalCertificateModel_1.default,
            key: 'Id'
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
    },
    ProfileImage: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: true,
        defaultValue: null
    }
}, {
    sequelize: connection_1.default,
    modelName: "trainer_tbl",
    tableName: "trainer_tbl",
    timestamps: true
});
exports.default = TrainerModel;
