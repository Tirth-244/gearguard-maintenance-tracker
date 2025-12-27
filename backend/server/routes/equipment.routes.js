const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipment.controller");
const { auth } = require("../middleware/auth.middleware");

router.post("/", auth, equipmentController.createEquipment);
router.get("/", equipmentController.getEquipment);
router.get("/:id", equipmentController.getEquipmentById);
router.put("/:id", auth, equipmentController.updateEquipment);
router.delete("/:id", auth, equipmentController.deleteEquipment);

module.exports = router;
