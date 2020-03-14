import { Model, DataTypes, ModelAttributes, InitOptions, SyncOptions } from "sequelize";
import { database } from "../database/index";

export interface iRecomendacao {
    titulo: string;
    media_resposta: number ;
    categoria?: string;

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
    }
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