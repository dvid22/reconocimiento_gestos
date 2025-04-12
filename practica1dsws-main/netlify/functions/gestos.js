let gestos = [];

exports.handler = async function(event, context) {
  const { httpMethod, path, queryStringParameters, body } = event;

  const getIdFromPath = () => {
    const matches = path.match(/\/gestos\/(\d+)/);
    return matches ? parseInt(matches[1]) : null;
  };

  switch (httpMethod) {
    case "GET":
      if (queryStringParameters && queryStringParameters.id) {
        const id = parseInt(queryStringParameters.id);
        const gesto = gestos.find(g => g.id === id);
        if (gesto) {
          return {
            statusCode: 200,
            body: JSON.stringify(gesto),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: "Gesto no encontrado" }),
          };
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(gestos),
      };

    case "POST":
      const nuevo = JSON.parse(body);
      gestos.push(nuevo);
      return {
        statusCode: 201,
        body: JSON.stringify(nuevo),
      };

    case "PUT":
      const idToUpdate = getIdFromPath();
      if (!idToUpdate) {
        return { statusCode: 400, body: "ID no especificado" };
      }

      const datosActualizados = JSON.parse(body);
      const indexToUpdate = gestos.findIndex(g => g.id === idToUpdate);

      if (indexToUpdate === -1) {
        return { statusCode: 404, body: "Gesto no encontrado" };
      }

      gestos[indexToUpdate] = { ...gestos[indexToUpdate], ...datosActualizados };
      return {
        statusCode: 200,
        body: JSON.stringify(gestos[indexToUpdate]),
      };

    case "DELETE":
      const idToDelete = getIdFromPath();
      if (!idToDelete) {
        return { statusCode: 400, body: "ID no especificado" };
      }

      gestos = gestos.filter(g => g.id !== idToDelete);
      return { statusCode: 204, body: "" };

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Método no permitido" }),
      };
  }
};
