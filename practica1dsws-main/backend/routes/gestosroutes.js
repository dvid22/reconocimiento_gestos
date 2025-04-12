const express = require('express');
const router = express.Router();
const gestosController = require('../controllers/gestoscontrollers');

router.post('/gestos', gestosController.createGesto);
router.get('/gestos', gestosController.getGestos);
router.put('/gestos/:id', gestosController.updateGesto);
router.delete('/gestos/:id', gestosController.deleteGesto);

module.exports = router;