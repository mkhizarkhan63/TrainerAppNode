"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class ActivitesModel extends sequelize_1.Model {
}
// Initialize the model
ActivitesModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize: connection_1.default, // Pass the Sequelize instance
    modelName: 'activities_tbl', // Table name in the database
    tableName: 'activities_tbl',
    timestamps: false,
});
exports.default = ActivitesModel;
