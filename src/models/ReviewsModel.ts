import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Client from './ClientModel';
import Trainer from './TrainerModel';
import { IReviewAttributes } from '../interfaces/IReview';
import ClientModel from './ClientModel';



class ReviewModel extends Model<IReviewAttributes> implements IReviewAttributes {
    public Id!: number;
    public ClientId!: number;
    public TrainerId!: number;
    public Ratings!: number;
    public Reviews!: string;
    public createdAt!: Date;
    public Client!: ClientModel;
}

// Initialize the model
ReviewModel.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    Ratings: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    Reviews: {
        type: DataTypes.STRING(256),
        allowNull: true,

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
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: Client,
            key: 'Id',
        },
    },


}, {
    sequelize, // Pass the Sequelize instance
    modelName: 'review_tbl', // Table name in the database
    tableName: 'review_tbl',
    timestamps: true, // Add this if you're not using `createdAt` and `updatedAt` fields
});


export default ReviewModel;
