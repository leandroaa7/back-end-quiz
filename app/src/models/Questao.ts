import { Model, DataTypes, ModelAttributes, InitOptions, SyncOptions } from "sequelize";
import { database } from "../database/index"

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

export class Questao extends Model { }

export const schemaAttributes: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
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


Questao.init(schemaAttributes, initOptions)
Questao.sync(syncOptions);