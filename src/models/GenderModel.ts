import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { IGenderAttributes } from '../interfaces/IGender';


class Gender extends Model<IGenderAttributes> implements IGenderAttributes {

    public Id!: number;
    public Gender!: string;
}

//Intialize the model
Gender.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Gender: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }
}, {
    sequelize, // Pass the Sequelize instance
    modelName: 'gender_tbl', // Table name in the database
    tableName: 'gender_tbl',
    timestamps: false,
})

export default Gender;