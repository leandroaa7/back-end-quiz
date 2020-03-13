import { Model, ModelAttributes, DataTypes } from "sequelize";
import { database } from "../database/index";

export default class Alternativa extends Model {



    public titulo: string;
    public peso: number;
    public id: number;
    public readonly created_at: Date;
    public readonly updated_at: Date;
    public dataValues: Object;

}


export const alternativaSchema: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

Alternativa.init(alternativaSchema, {
    tableName: "alternativa",
    sequelize: database
});

Alternativa.sync({ force: true })
