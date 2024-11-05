import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Type from './TypeModel';
import { IAuthAttributes } from '../interfaces/IAuth';
import Client from './ClientModel';
import Trainer from './TrainerModel';




class Auth extends Model<IAuthAttributes> implements IAuthAttributes {
    public Id!: number;
    public EmailAddress!: string;
    public Password!: string;
    public TypeId!: number;  // Foreign key
    public ClientId!: number;
    public TrainerId!: number;
    public CreatedOn!: Date;
    public UpdatedOn!: Date;
    public OTP!: string;
    public OTPExpires!: Date;
    public IsVerified!: boolean;
}

// Initialize the model
Auth.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    EmailAddress: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    TypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
            model: Type,  // Reference the Type model
            key: 'Id',    // Column in Type model
        }
    },
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: Client,
            key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    TrainerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: Trainer,
            key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    OTP: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    OTPExpires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    IsVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}, {
    sequelize, // Pass the Sequelize instance
    modelName: 'auth_tbl', // Table name in the database
    tableName: 'auth_tbl',
    timestamps: true, // Add this if you're not using `createdAt` and `updatedAt` fields
});


export default Auth;
