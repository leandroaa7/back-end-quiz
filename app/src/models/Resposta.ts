import { Model, ModelAttributes, DataTypes, InitOptions, SyncOptions } from 'sequelize';
import { database } from '../database/index';

export interface iResposta {
    id_alternativa_escolhida: number,
    resposta_nao_alternativa?: string
}

export default class Resposta extends Model { }

export const modelAttributes: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_alternativa_escolhida: {
        type: DataTypes.UUID,
        allowNull: false
    },
    resposta_nao_alternativa: {
        type: DataTypes.STRING,
        allowNull: true
    }
};

const initOptions: InitOptions = {
    sequelize: database,
    modelName: "resposta",
    underscored:true
}

Resposta.init(modelAttributes, initOptions);

const syncOptions: SyncOptions = {
    force: true
}

Resposta.sync(syncOptions);
