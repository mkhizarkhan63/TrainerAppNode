import { DataTypes, Model } from "sequelize";
import { ITrainerPersonalTrainServicesAttributes } from "../interfaces/ITrainerPersonalTrainServices";
import sequelize from "../database/connection";
import PersonalTrainingServicesModel from "./PersonalTrainingServicesModel";
import TrainerModel from "./TrainerModel";
import ClientModel from "./ClientModel";


class UserPersonalTrainingServicesModel extends Model<ITrainerPersonalTrainServicesAttributes> implements ITrainerPersonalTrainServicesAttributes {

    public Id!: number;
    public PersonalTrainingServiceId!: number;
    public TrainerId!: number;
    public ClientId!: number;

    public PersonalTrainingService!: PersonalTrainingServicesModel;
}



UserPersonalTrainingServicesModel.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PersonalTrainingServiceId: {
        type: DataTypes.INTEGER,
        references: {
            model: PersonalTrainingServicesModel,
            key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    TrainerId: {
        type: DataTypes.INTEGER,
        references: {
            model: TrainerModel,
            key: 'Id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    },
    ClientId: {
        type: DataTypes.INTEGER,
        references: {
            model: ClientModel,
            key: 'Id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    }


}, {
    sequelize,
    modelName: 'user_personaltrainservice_tbl',
    tableName: 'user_personaltrainservice_tbl',
    timestamps: false
});


export default UserPersonalTrainingServicesModel;