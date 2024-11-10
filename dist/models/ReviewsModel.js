"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const ClientModel_1 = __importDefault(require("./ClientModel"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
class ReviewModel extends sequelize_1.Model {
}
// Initialize the model
ReviewModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Ratings: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Reviews: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: true,
    },
    TrainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: TrainerModel_1.default,
            key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    ClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: ClientModel_1.default,
            key: 'Id',
        },
    },
}, {
    sequelize: connection_1.default, // Pass the Sequelize instance
    modelName: 'review_tbl', // Table name in the database
    tableName: 'review_tbl',
    timestamps: true, // Add this if you're not using `createdAt` and `updatedAt` fields
});
exports.default = ReviewModel;
