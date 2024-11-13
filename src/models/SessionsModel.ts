import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Type from './TypeModel';
import { ISessionAttributes, locationType } from '../interfaces/ISession';
import ActivitesModel from './ActivitiesModel';
import ClientModel from './ClientModel';
import TrainerModel from './TrainerModel';
import SessionParticipantModel from './SessionParticipantModel';



class SessionModel extends Model<ISessionAttributes> implements ISessionAttributes {
    public Id!: number;
    public title!: string;
    public scheduledDate!: string;
    public scheduledTime!: string;
    public activityId!: number;
    public totalCapacity!: number;
    public location!: locationType;
    public address!: string;
    public classType!: string;
    public description!: string;
    public price!: string;
    public link!: string;
    public TypeId!: number;
    public ClientId!: number;
    public TrainerId!: number;

    public Activity!: ActivitesModel;
    public SessionParticipant!: SessionParticipantModel[];
}

SessionModel.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    scheduledDate: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    scheduledTime: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    activityId: {
        type: DataTypes.INTEGER,
        references: {
            model: ActivitesModel,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    },
    totalCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    classType: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    price: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    link: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    TypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: Type,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    },
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: ClientModel,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    },
    TrainerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: TrainerModel,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    }



}, {
    sequelize,
    modelName: "sessions_tbl",
    tableName: "sessions_tbl",
    timestamps: true
});

export default SessionModel;