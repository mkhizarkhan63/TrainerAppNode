"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Type extends sequelize_1.Model {
}
// Initialize the model
Type.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default, // Pass the Sequelize instance
    modelName: 'type_tbl', // Table name in the database
    tableName: 'type_tbl',
    timestamps: false, // Add this if you're not using `createdAt` and `updatedAt` fields
});
exports.default = Type;
