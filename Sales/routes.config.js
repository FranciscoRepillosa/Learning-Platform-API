const express = require("express");
const router = express.Router();

const salesController = require("./controllers/sales.controller");
const authController = require("../users/controllers/auth.controller");

router.post("/:courseId", authController.protect, salesController.createSales);
router.get("/", authController.protect, salesController.getSales);
router.get("/show", authController.protect, salesController.renderSalesPage);


module.exports = router;

