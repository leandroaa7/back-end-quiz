# estudo-node-typescript-sequelize-sqlite

### Estudo de node com typescript utilizando ORM sequelize e sqlite3

#### A aplicação cadastra usuários, em **"/usuario"** 

### Para Executar digite os comando


- `sequelize db:migrate `
- `yarn add`
- `yarn run dev `

### a pasta test possui um arquivo para ser utilizado no **Insomnia**





### observações
 
#### 1 - para criar uma nova migration digite o comando 

`sequelize migration:generate --name=create-NOME_DO_MEU_MODEL`

#### Irá criar um alrquivo em /dist/database/migrations. Mova este arquivo para /src/database/migrations e transforme-o em .ts ao invés de js

#### 2 - Arquivos .js.map em /dist/database/migrations impedem o sequelize de fazer as migrations, exclua-os. Estes arquivos são gerados pelo Typescript e são úteis para debug.