import { DataTypes, Model } from "sequelize";
import { ISpeacializationAttributes } from "../interfaces/ISpecialization";
import sequelize from '../database/connection';


class SpecializationModel extends Model<ISpeacializationAttributes> implements ISpeacializationAttributes {
    public Id!: number;
    public Name!: string;

}

SpecializationModel.init({
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
    modelName: "specialization_tbl",
    tableName: "specialization_tbl",
    timestamps : false
});

export default SpecializationModel;