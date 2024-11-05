import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { IUserCertificateAttributes } from '../interfaces/IUserCertificate';
import CertificateModel from './CertificateModel';
import ClientModel from './ClientModel';
import TrainerModel from './TrainerModel';
import TypeModel from './TypeModel';


class UserCertificateModel extends Model<IUserCertificateAttributes> implements IUserCertificateAttributes {
    public Id!: number;
    public certificateId!: number;
    public clientId!: number;
    public trainerId!: number;
    public typeId !: number;

    public Certificates!: CertificateModel
}

UserCertificateModel.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    certificateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CertificateModel,
            key: 'Id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: ClientModel,
            key: 'Id'
        }
        , onUpdate: "SET NULL",
        onDelete: "SET NULL"
    },
    trainerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: TrainerModel,
            key: 'Id'
        }
        , onUpdate: "SET NULL",
        onDelete: "SET NULL"
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeModel,
            key: 'Id'
        },

    }


}, {
    sequelize,
    modelName: "usercertificate_tbl",
    tableName: "usercertificate_tbl",
    timestamps: false
});

export default UserCertificateModel;