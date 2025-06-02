const handleError = (err, res) => {
  if (err.response) {
    // Erro da API externa (recebeu uma resposta de erro)
    // Exemplo: se a API externa retornou 401, repassa 401
    // Pode-se adicionar lógica para mapear códigos de status externos se necessário
    res.status(err.response.status || 500).json({ // Usa 500 como fallback se o status não for claro
      error: err.response.data || "Erro na API externa",
      details: err.message, // Inclui a mensagem original do erro para depuração
    });
  } else if (err.request) {
    // A requisição foi feita, mas nenhuma resposta foi recebida (timeout, rede offline)
    // Isso é um erro de gateway/timeout
    res.status(504).json({
      error: "Gateway Timeout: Nenhuma resposta do servidor externo ou problema de rede.",
      details: err.message, // Inclui a mensagem original do erro para depuração
    });
  } else if (err.statusCode) {
    // Erros com um statusCode explícito (por exemplo, erros personalizados)
    // Isso é útil para erros que você lança internamente com um código de status específico
    res.status(err.statusCode).json({
      error: err.message,
    });
  } else if (err.name === 'ValidationError') { // Exemplo para erros de validação (como de Joi, Mongoose, etc.)
    res.status(400).json({
      error: "Erro de validação",
      details: err.message,
      // Pode incluir err.details se a biblioteca de validação fornecer
    });
  } else if (err.message === 'Invalid authentication credentials') {
    // Exemplo de erro específico para credenciais inválidas, se você o lança assim
    res.status(401).json({ error: "Credenciais de autenticação inválidas" });
  } else if (err.message === 'Resource not found') {
    // Exemplo de erro específico para recurso não encontrado
    res.status(404).json({ error: "Recurso não encontrado" });
  }
  else {
    // Outros erros internos não tratados especificamente acima
    console.error("Erro interno do servidor:", err); // Log o erro completo para depuração
    res.status(500).json({
      error: "Erro interno do servidor.",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined, // Opcional: mostrar detalhes em dev
    });
  }
};

export { handleError };