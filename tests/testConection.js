import { sequelize } from "../src/config/conection.js";
// Importe seus modelos aqui, por exemplo:
// import { User } from './models/User';

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincroniza todos os modelos definidos com o banco de dados.
    // CUIDADO: { force: true } irá DELETAR e recriar as tabelas existentes.
    // Use apenas em desenvolvimento ou se souber o que está fazendo!
    // await sequelize.sync({ force: true });
    // console.log('Modelos sincronizados com o banco de dados.');

  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

connectToDatabase();