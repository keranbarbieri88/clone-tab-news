import { Client } from 'pg';

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development"? false :true,
  });
  console.log('Credenciais do PostgreSQL:', {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
  finally {
    // Garante que a conexão fecha mesmo se a query falhar
      try {
        await client.end();
    } catch (endError) {
      // Evita mascarar o erro original caso o end() falhe por falta de conexão
    }
  }
}

export default {
  //propriedade : função
  query: query,
};