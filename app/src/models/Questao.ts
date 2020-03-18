import { Model, DataTypes, ModelAttributes, InitOptions, SyncOptions } from "sequelize";
import { database } from "../database/index";
//import Alternativa from "./Alternativa";

export interface iQuestao {
    titulo: string;
    e_alternativa: boolean;
    peso: number;

    //sequelize Options
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    dataValues?: Object;
}

export default class Questao extends Model implements iQuestao {

    public titulo: string;
    public e_alternativa: boolean;
    public peso: number;

    //sequelize Options
    public id?: number;
    public created_at?: Date;
    public updated_at?: Date;


    // atributo do sequelize, declaro para funcionar nos testes porem 
    //esta declaração diz que dataValues pode possuir dataValues. MELHORAR
    public dataValues?: Object;

}

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
    e_alternativa: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    peso: {
        type: DataTypes.INTEGER,
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
//Questao.hasMany(Alternativa)
//Alternativa.belongsTo(Questao);

Questao.sync(syncOptions);