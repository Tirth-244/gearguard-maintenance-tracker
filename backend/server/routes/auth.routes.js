const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { auth } = require("../middleware/auth.middleware");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/profile", auth, authController.getProfile);
router.put("/profile", auth, authController.updateProfile);

module.exports = router;