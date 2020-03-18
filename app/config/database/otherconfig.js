//execute este arquivo para gerar uma nova configuração para a aplicação funcionar

const path = require('path')
const fs = require('fs');
const dotenv = require('dotenv');
let dbName, storage, env = process.env.NODE_ENV, config = {};
console.log(process.env.DB_DIALECT)
dotenv.config(
    { path: path.resolve(__dirname, "../env/.env") }
)

if (env === "production") {
    dbName = "database_production";
    storage = path.resolve(__dirname, "../../storage/database_production.sqlite")
} else {
    dbName = "database_development";
    storage = path.resolve(__dirname, "../../storage/database_development.sqlite")
}

if (process.env.DB_DIALECT == "sqlite") {

    const sqlite = require('sqlite3');
    config.dialectModule = sqlite;
    config.password = null;
    config.storage = storage;
} else if (process.env.DB_DIALECT == "postgres") {
    const pg = require('pg');
    config.dialectModule = pg;
    config.password = process.env.DB_PASS;
    config.port = process.env.DB_PORT
    //config.protocol = 'postgres'
} else {
    config.dialect = process.env.DB_DIALECT || 'sqlite'
}

config.host = process.env.DB_HOST;
config.username = process.env.DB_USER;
config.database = dbName;
//desabilitar logs
config.logging = false;
config.define = {
    //desativar o nome das tabelas criadas no plural
    freezeTableName: true,

    //faz com que toda tabela possua os campos created_at e updated_at
    timestamps: true,
    // faz com que as tabelas estejam no formato undeline, exemplo a tabela UserGroups se torna user_group
    underscored: true,
    // faz com que a regra como a de cima seja feita, também, nos campos da tabela
    underscoredAll: true

}

fs.writeFileSync(path.resolve(__dirname, "./config.json"), JSON.stringify(config), 'utf-8');


module.exports.development = config
module.exports.production = config
module.exports.test = config