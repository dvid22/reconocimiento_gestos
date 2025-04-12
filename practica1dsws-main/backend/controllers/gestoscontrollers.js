const Gestos = require('../models/gestos');

exports.createGesto = async (req, res) => {
  try {
    const newGesto = new Gestos(req.body);
    await newGesto.save();
    res.status(201).json(newGesto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGestos = async (req, res) => {
  try {
    const gestos = await Gestos.find();
    res.status(200).json(gestos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGesto = async (req, res) => {
  try {
    const gesto = await Gestos.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(gesto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteGesto = async (req, res) => {
  try {
    await Gestos.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};