import { Model, DataTypes, ModelAttributes, InitOptions, SyncOptions } from "sequelize";
import { database } from "../database/index";
import Questao from './Questao';

export interface iQuestionario {

    //sequelize Options
    id: number;
    created_at: Date;
    updated_at: Date;
    dataValues: Object;
}

export default class Questionario extends Model { }
export const schemaAttributes: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}

const initOptions: InitOptions = {
    sequelize: database,
    tableName: "questao"
}

const syncOptions: SyncOptions = {
    force: true
}

Questionario.init(schemaAttributes, initOptions);

Questionario.hasMany(Questao);

Questionario.sync(syncOptions);


