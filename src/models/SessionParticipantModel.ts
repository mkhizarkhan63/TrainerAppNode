import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { ISessionParticipentAttributes } from '../interfaces/ISessionParticipent';
import SessionModel from './SessionsModel';
import ClientModel from './ClientModel';


class SessionParticipantModel extends Model<ISessionParticipentAttributes> implements ISessionParticipentAttributes {
    public Id!: number;
    public SessionId!: number;
    public ClientId!: number;
}

SessionParticipantModel.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ClientModel,
            key: "Id"
        }
    },
    SessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SessionModel,
            key: "Id"
        }
    }
},{
        sequelize,
        modelName: "sessionParticipent_tbl",
        tableName: "sessionParticipent_tbl",
        timestamps: true
    }
);


export default SessionParticipantModel;