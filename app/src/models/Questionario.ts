import { Model, DataTypes, ModelAttributes, InitOptions, SyncOptions } from "sequelize";
import { database } from "../database/index";
import Questao from './Questao';
import Resposta from './Resposta';

export interface iQuestionario {

    //sequelize Options
    id: number;
    created_at: Date;
    updated_at: Date;
    dataValues: Object;
}

export default class Questionario extends Model { }
export const modelAttributes: ModelAttributes = {
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

Questionario.init(modelAttributes, initOptions);

Questionario.hasMany(Questao);
Questionario.hasMany(Resposta)

Questionario.sync(syncOptions);


