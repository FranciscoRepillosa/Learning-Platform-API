const express = require("express");
const router = express.Router();

const authController = require(".././users/controllers/auth.controller");
const responseController = require("./controllers/response.controller");

router.post("/:questionId", authController.protect, responseController.createResponse);
router.get("/:questionId", authController.protect, responseController.getResponses);

module.exports = router; 