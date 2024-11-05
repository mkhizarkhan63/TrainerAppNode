"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const TypeModel_1 = __importDefault(require("./TypeModel"));
const ClientModel_1 = __importDefault(require("./ClientModel"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
class Auth extends sequelize_1.Model {
}
// Initialize the model
Auth.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    EmailAddress: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    Password: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    TypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeModel_1.default, // Reference the Type model
            key: 'Id', // Column in Type model
        }
    },
    ClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: ClientModel_1.default,
            key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    OTP: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: true
    },
    OTPExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    IsVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: connection_1.default, // Pass the Sequelize instance
    modelName: 'auth_tbl', // Table name in the database
    tableName: 'auth_tbl',
    timestamps: true, // Add this if you're not using `createdAt` and `updatedAt` fields
});
exports.default = Auth;
