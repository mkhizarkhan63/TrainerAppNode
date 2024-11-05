"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Gender extends sequelize_1.Model {
}
//Intialize the model
Gender.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Gender: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    }
}, {
    sequelize: connection_1.default, // Pass the Sequelize instance
    modelName: 'gender_tbl', // Table name in the database
    tableName: 'gender_tbl',
    timestamps: false,
});
exports.default = Gender;
