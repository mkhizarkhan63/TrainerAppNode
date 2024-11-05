import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { ILanguageAttributes } from '../interfaces/ILanguage';


class LanguageModel extends Model<ILanguageAttributes> implements ILanguageAttributes {
    public Id!: number;
    public Name!: string;
}

LanguageModel.init({

    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING(45),
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'languages_tbl',
    tableName: 'languages_tbl',
    timestamps: false,
});

export default LanguageModel;