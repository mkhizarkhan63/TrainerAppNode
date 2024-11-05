import { DataTypes, Model } from "sequelize";
import { ITrainerSpecializationAttributes } from "../interfaces/ITrainerSpecialization";
import sequelize from "../database/connection";
import TrainerModel from "./TrainerModel";
import SpecializationModel from "./SpecializationModel";
import ClientModel from "./ClientModel";



class UserSpecializationModel extends Model<ITrainerSpecializationAttributes> implements ITrainerSpecializationAttributes {
    public Id!: number;
    public SpecializationId!: number;
    public TrainerId!: number;
    public ClientId!: number;

    public Specializations!: SpecializationModel;
}


UserSpecializationModel.init({

    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    TrainerId: {
        type: DataTypes.INTEGER,
        references: {
            model: TrainerModel,
            key: 'Id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    },
    SpecializationId: {
        type: DataTypes.INTEGER,
        references: {
            model: SpecializationModel,
            key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    ClientId: {
        type: DataTypes.INTEGER,
        references: {
            model: ClientModel,
            key: 'Id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    }

}, {
    sequelize,
    tableName: "user_specialization_tbl",
    modelName: "user_specialization_tbl",
    timestamps: false
}
);

export default UserSpecializationModel;