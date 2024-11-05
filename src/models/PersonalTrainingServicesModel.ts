import { DataTypes, Model } from "sequelize";
import { IPersonalTrainingServicesAttributes } from "../interfaces/IPersonalTrainingServices";
import sequelize from "../database/connection";
import UserPersonalTrainingServicesModel from "./UserPersonalTrainingServicesModel";


class PersonalTrainingServicesModel extends Model<IPersonalTrainingServicesAttributes> implements IPersonalTrainingServicesAttributes {

    public Id!: number;
    public Name!: string;
}

PersonalTrainingServicesModel.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'personaltrainingservices_tbl',
    tableName: 'personaltrainingservices_tbl',
    timestamps: false
});



export default PersonalTrainingServicesModel;