import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { ITrainerMediaAttributes } from '../interfaces/ITrainerMedia';
import TrainerModel from './TrainerModel';


class TrainerMediaModel extends Model<ITrainerMediaAttributes> implements ITrainerMediaAttributes {
    public Id!: number;
    public TrainerId!: number;
    public Path!: string;
    public MediaType!: number;
}

TrainerMediaModel.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TrainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TrainerModel,
            key: "Id"
        }
    },
    Path: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    MediaType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    sequelize,
    modelName: "trainerMedia_tbl",
    tableName: "trainerMedia_tbl",
    timestamps: false
});


export default TrainerMediaModel;