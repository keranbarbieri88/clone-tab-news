function status(request, response) {
  response.status(200).json({ status: "Requisição feita com sucesso!" })
}

export default status;