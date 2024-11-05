import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Gender from './GenderModel';
import Type from './TypeModel';
import { ITrainerAttributes } from '../interfaces/ITrainer';
import UserNationalCertificateModel from './UserNationalCertificateModel';
import UserPersonalTrainingServicesModel from './UserPersonalTrainingServicesModel';
import UserSpecializationModel from './UserSpecializationModel';
import UserLanguageModel from './UserLanguagesModel';
import UserCertificateModel from './UserCertificateModel';
import { GenderModel, SocialLinkModel } from './_associations';


class TrainerModel extends Model<ITrainerAttributes> implements ITrainerAttributes {
    public Id!: number;
    public FirstName !: string;
    public LastName!: string;
    public MobileNumber!: string;
    public DoB!: string;
    public Nationality!: string;
    public CountryResidence!: string;
    public GenderId!: number;
    public TypeId!: number;
    public NationalCertificateId!: number;
    public Description!: string;

    public UserPersonalTrainingServices!: UserPersonalTrainingServicesModel[];
    public UserSpecialization!: UserSpecializationModel[];
    public UserLanguages!: UserLanguageModel[];
    public UserCertificates!: UserCertificateModel[];
    public UserNationalCertificates !: UserNationalCertificateModel;
    public Gender!: GenderModel;
    public SocialLinks!: SocialLinkModel[];
}

TrainerModel.init({
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
    Description: {
        type: DataTypes.STRING(256),
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
    NationalCertificateId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: UserNationalCertificateModel,
            key: 'Id'
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
    },

}, {
    sequelize,
    modelName: "trainer_tbl",
    tableName: "trainer_tbl",
    timestamps: true
});


export default TrainerModel;