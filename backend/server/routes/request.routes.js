const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request.controller");
const { auth, adminOnly } = require("../middleware/auth.middleware");

router.post("/", auth, requestController.createRequest);
router.get("/", auth, requestController.getRequests);
router.get("/:id", auth, requestController.getRequestById);
router.put("/:id", auth, adminOnly, requestController.updateRequestStatus);
router.delete("/:id", auth, requestController.deleteRequest);

module.exports = router;
