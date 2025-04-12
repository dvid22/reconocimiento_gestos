let gestos = [];

exports.getAllGestos = (req, res) => {
  res.json(gestos);
};

exports.getGestoById = (req, res) => {
  const gesto = gestos.find(g => g.id === parseInt(req.params.id));
  gesto ? res.json(gesto) : res.status(404).send("Gesto no encontrado");
};

exports.createGesto = (req, res) => {
  const { id, nombre, descripcion } = req.body;
  const nuevoGesto = { id, nombre, descripcion };
  gestos.push(nuevoGesto);
  res.status(201).json(nuevoGesto);
};

exports.updateGesto = (req, res) => {
  const gesto = gestos.find(g => g.id === parseInt(req.params.id));
  if (gesto) {
    gesto.nombre = req.body.nombre;
    gesto.descripcion = req.body.descripcion;
    res.json(gesto);
  } else {
    res.status(404).send("Gesto no encontrado");
  }
};

exports.deleteGesto = (req, res) => {
  gestos = gestos.filter(g => g.id !== parseInt(req.params.id));
  res.status(204).send();
};
