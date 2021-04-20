const express = require("express");
const router = express.Router();

const authController = require(".././users/controllers/auth.controller");
const responseController = require("./controllers/response.controller");

router.post("/:responseId", authController.protect, responseController.CreateResponse);
router.get("/:responseId", authController.protect, responseController.getResponses);

module.exports = router; 