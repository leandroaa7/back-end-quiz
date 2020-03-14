import { Model, DataTypes, ModelAttributes, InitOptions, SyncOptions } from "sequelize";
import { database } from "../database/index";

export interface iRecomendacao {
    titulo: string;
    media_resposta: number;
    menor_intervalo: number;
    maior_intervalo: number;

    //sequelize Options
    id: number;
    created_at: Date;
    updated_at: Date;
    dataValues: Object;
}

export default class Recomendacao extends Model { }

export const modelAttributes: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    media_resposta: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    menor_intervalo: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    maior_intervalo: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}

const initOptions: InitOptions = {
    sequelize: database,
    tableName: "recomendacao"
}

const syncOptions: SyncOptions = {
    force: true
}


Recomendacao.init(modelAttributes, initOptions)

Recomendacao.sync(syncOptions);