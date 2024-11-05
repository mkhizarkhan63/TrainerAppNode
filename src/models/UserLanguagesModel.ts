import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { IUserLanguageAtrributes } from '../interfaces/IUserLanguage';
import LanguageModel from './LanguageModel';
import TrainerModel from './TrainerModel';
import ClientModel from './ClientModel';


class UserLanguageModel extends Model<IUserLanguageAtrributes> implements IUserLanguageAtrributes {
    public Id!: number;
    public LanguageId!: number;
    public TrainerId!: number;
    public ClientId!: number;

    public Languages!: LanguageModel;
}

UserLanguageModel.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    LanguageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: LanguageModel,
            key: 'Id'
        }
    },
    TrainerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: TrainerModel,
            key: 'Id'
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL",

    },
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ClientModel,
            key: 'Id'
        },
        defaultValue: null,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
    },

}, {
    sequelize,
    modelName: "user_languages_tbl",
    tableName: "user_languages_tbl",
    timestamps: false
});

export default UserLanguageModel;