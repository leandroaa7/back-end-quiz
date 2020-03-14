import { Model, ModelAttributes, DataTypes } from "sequelize";
import { database } from "../database/index";

export interface iAlternativa {

    titulo: string;
    peso: number;

    //sequelize Options
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    dataValues?: Object;
}

export default class Alternativa extends Model {
    // atributo do sequelize, declaro para funcionar nos testes
    public dataValues: iAlternativa;
}


export const alternativaAttributes: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

Alternativa.init(alternativaAttributes, {
    tableName: "alternativa",
    sequelize: database
});

Alternativa.sync({ force: true })
