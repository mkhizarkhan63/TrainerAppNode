"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const TypeModel_1 = __importDefault(require("./TypeModel"));
const ActivitiesModel_1 = __importDefault(require("./ActivitiesModel"));
const ClientModel_1 = __importDefault(require("./ClientModel"));
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
class SessionModel extends sequelize_1.Model {
}
SessionModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    scheduledDate: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    scheduledTime: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    activityId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ActivitiesModel_1.default,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    },
    totalCapacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    classType: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    link: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true
    },
    TypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: TypeModel_1.default,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    },
    ClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: ClientModel_1.default,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    },
    TrainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: TrainerModel_1.default,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    }
}, {
    sequelize: connection_1.default,
    modelName: "sessions_tbl",
    tableName: "sessions_tbl",
    timestamps: true
});
exports.default = SessionModel;
