import { Model, ModelAttributes, DataTypes } from "sequelize";
import { database } from "../database/index";
import Questao from "./Questao";

export interface iAlternativa {

    titulo: string;
    peso: number;
    //sequelize Options
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    dataValues?: Object;
}

export default class Alternativa extends Model implements iAlternativa {

    public titulo: string;
    public peso: number;

    //sequelize Options
    public id?: number;
    public created_at?: Date;
    public updated_at?: Date;

    // atributo do sequelize, declaro para funcionar nos testes porem 
    //esta declaração diz que dataValues pode possuir dataValues. MELHORAR
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
    sequelize: database,
    underscored:true
});

Alternativa.belongsTo(Questao);

Alternativa.sync({ force: true })
