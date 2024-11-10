import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { IActivitiesAttributes } from '../interfaces/IActivities';




class ActivitesModel extends Model<IActivitiesAttributes> implements IActivitiesAttributes {
    public Id!: number;
    public Name!: string;
}

// Initialize the model
ActivitesModel.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize, // Pass the Sequelize instance
    modelName: 'activities_tbl', // Table name in the database
    tableName: 'activities_tbl',
    timestamps: false,
});


export default ActivitesModel;
