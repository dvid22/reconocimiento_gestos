let gestos = []; // Simula una DB en memoria

exports.handler = async (event) => {
  const { httpMethod, body, queryStringParameters } = event;

  try {
    switch (httpMethod) {
      case 'GET':
        return { statusCode: 200, body: JSON.stringify(gestos) };

      case 'POST':
        const nuevoGesto = JSON.parse(body);
        gestos.push({ ...nuevoGesto, id: Date.now().toString() });
        return { statusCode: 201, body: JSON.stringify(nuevoGesto) };

      case 'PUT':
        const { id } = queryStringParameters;
        const gestoActualizado = JSON.parse(body);
        gestos = gestos.map(gesto => 
          gesto.id === id ? { ...gesto, ...gestoActualizado } : gesto
        );
        return { statusCode: 200, body: JSON.stringify(gestos) };

      case 'DELETE':
        gestos = gestos.filter(gesto => gesto.id !== queryStringParameters.id);
        return { statusCode: 200, body: JSON.stringify(gestos) };

      default:
        return { statusCode: 405, body: "Method Not Allowed" };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};