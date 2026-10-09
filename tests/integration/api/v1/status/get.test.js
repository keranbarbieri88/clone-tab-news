test("GET to /api/v1/status should return status 200", async () => {
  //função client http que faz requests e recebe responses, recebe como parametro a url que devolver uma promise - promessa de valor futuro. 
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // parsing de um texto puro para json
  const responseBody = await response.json();
  // verificando se o campo updated_at está definido, mas não o conteúdo dentro dela.
  expect(responseBody.updated_at).toBeDefined();

  // verificando se o campo updated_at é uma data válida
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  //validando a versão do PostgreSQL
  expect(responseBody.dependencies.database.version).toEqual("16.0"); 

  // validando o número máximo de conexões do PostgreSQL
  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  // validando o número de conexões usadas do PostgreSQL
  expect(responseBody.dependencies.database.opened_connections).toEqual(1); 

});
