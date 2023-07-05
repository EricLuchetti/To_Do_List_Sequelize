import { Sequelize } from 'sequelize';
import { environments } from './libs/environments';

const db = environments.db_database ? environments.db_database : '';
const username = environments.db_username ? environments.db_username : '';
const password = environments.db_password;

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: environments.db_host,
    port: environments.db_port ? parseInt(environments.db_port) : 3306,
    username: username,
    password: password,
    database: db,
    timezone: '-03:00'
});

try {
    sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');
} catch (error) {
    console.error('Authenticate: Não foi possível se conectar com o banco de dados:', error);
}

(async () => {
    try {
        await sequelize.sync({ alter: false });
    } catch(error) {
        console.error('Sync: Não foi possível se conectar com o banco de dados:', error);
    }
})();