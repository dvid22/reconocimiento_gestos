const express = require("express");
const router = express.Router();
const gestosController = require("../controllers/gestoscontrollers");

router.get("/", gestosController.getAllGestos);
router.get("/:id", gestosController.getGestoById);
router.post("/", gestosController.createGesto);
router.put("/:id", gestosController.updateGesto);
router.delete("/:id", gestosController.deleteGesto);

module.exports = router;
