import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { ICertificateAttributes } from '../interfaces/ICertificate';


class CertificateModel extends Model<ICertificateAttributes> implements ICertificateAttributes {
    public Id!: number;
    public Name !: string;
}

CertificateModel.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },

}, {
    sequelize,
    modelName: "certificate_tbl",
    tableName: "certificate_tbl",
    timestamps: true
});

export default CertificateModel;