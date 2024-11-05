import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { UserNationalCertificateAttributes } from '../interfaces/IUserNationalCertificate';


class UserNationalCertificateModel extends Model<UserNationalCertificateAttributes> implements UserNationalCertificateAttributes {
    public Id!: number;
    public Name!: string;
}

UserNationalCertificateModel.init({

    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING(200),
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'nationalcertificate_tbl',
    tableName: 'nationalcertificate_tbl',
    timestamps: false,
});

export default UserNationalCertificateModel;