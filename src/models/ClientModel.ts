import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Gender from './GenderModel';
import Type from './TypeModel';
import { IClientAttributes } from '../interfaces/IClient';
import SessionModel from './SessionsModel';
import UserPersonalTrainingServicesModel from './UserPersonalTrainingServicesModel';
import UserSpecializationModel from './UserSpecializationModel';
import GenderModel from './GenderModel';
import AuthModel from './AuthModel';



class ClientModel extends Model<IClientAttributes> implements IClientAttributes {
    public Id!: number;
    public FirstName!: string;
    public LastName!: string;
    public MobileNumber!: string;
    public DoB!: string;
    public Nationality!: string;
    public CountryResidence!: string;
    public GenderId!: number;
    public TypeId!: number;
    public location!: string;
    public ProfileImage!: string;

    public UserPersonalTrainingServices!: UserPersonalTrainingServicesModel[];
    public UserSpecialization!: UserSpecializationModel[];
    public Sessions!: SessionModel[];
    public Gender!: GenderModel;
    public Auth!: AuthModel;
}

ClientModel.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    MobileNumber: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    DoB: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    CountryResidence: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    Nationality: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    location: {
        type: DataTypes.JSON,
        allowNull: true
    },
    GenderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gender,
            key: 'Id'
        }
    },
    TypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Type,
            key: 'Id'
        }
    },
    ProfileImage: {
        type: DataTypes.STRING(256),
        allowNull: true,
        defaultValue: null
    }

}, {
    sequelize,
    modelName: "client_tbl",
    tableName: "client_tbl",
    timestamps: true
});

export default ClientModel;