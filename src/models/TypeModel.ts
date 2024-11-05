import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { ITypeAttributes } from '../interfaces/IType';



class Type extends Model<ITypeAttributes> implements ITypeAttributes {
    public Id!: number; // Use '!' because it's auto-incremented, and initialized by Sequelize
    public Type!: string;
}

// Initialize the model
Type.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, // Pass the Sequelize instance
    modelName: 'type_tbl', // Table name in the database
    tableName: 'type_tbl',
    timestamps: false, // Add this if you're not using `createdAt` and `updatedAt` fields
});


export default Type;