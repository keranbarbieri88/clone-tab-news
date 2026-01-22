test("GET to /api/v1/status should return status 200 and correct body", async () => {
  //função client http que faz requests e recebe responses, recebe como parametro a url que devolver uma promise 
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200);

 });
