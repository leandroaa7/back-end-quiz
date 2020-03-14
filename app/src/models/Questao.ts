import { Model, DataTypes, ModelAttributes, InitOptions, SyncOptions } from "sequelize";
import { database } from "../database/index";
import Alternativa from "./Alternativa";

export interface iQuestao {
    titulo: string;
    eAlternativa: boolean;
    peso?: number;

    //sequelize Options
    id: number;
    created_at: Date;
    updated_at: Date;
    dataValues: Object;
}

export default class Questao extends Model { }

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
    eAlternativa: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}

const initOptions: InitOptions = {
    sequelize: database,
    tableName: "questao"
}

const syncOptions: SyncOptions = {
    force: true
}


Questao.init(modelAttributes, initOptions)

// relação 1:N
Questao.hasMany(Alternativa)

Questao.sync(syncOptions);