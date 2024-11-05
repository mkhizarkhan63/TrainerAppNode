"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const GenderModel_1 = __importDefault(require("./GenderModel"));
const TypeModel_1 = __importDefault(require("./TypeModel"));
class ClientModel extends sequelize_1.Model {
}
ClientModel.init({
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
    GenderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GenderModel_1.default,
            key: 'Id'
        }
    },
    TypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeModel_1.default,
            key: 'Id'
        }
    }
}, {
    sequelize: connection_1.default,
    modelName: "client_tbl",
    tableName: "client_tbl",
    timestamps: true
});
exports.default = ClientModel;
