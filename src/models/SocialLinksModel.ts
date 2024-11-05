import { DataTypes, Model } from "sequelize";
import { ISocialLinksAttributes } from "../interfaces/ISocialLinks";
import sequelize from '../database/connection';
import TrainerModel from "./TrainerModel";


class SocialLinkModel extends Model<ISocialLinksAttributes> implements ISocialLinksAttributes {

    public Id!: number | undefined;
    public SocialLink!: string;
    public TrainerId!: number;
}

SocialLinkModel.init({

    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    SocialLink: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    TrainerId: {
        type: DataTypes.INTEGER,
        references: {
            model: TrainerModel,
            key: 'Id'
        }
    }


}, {
    sequelize,
    modelName: "socialLinks_tbl",
    tableName: "socialLinks_tbl",
    timestamps: false
});

export default SocialLinkModel;