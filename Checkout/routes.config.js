const express = require("express")
const router = express.Router();
const checkoutController = require("./controllers/checkout.controller");

router.get("/:courseId", checkoutController.getClientSecret);


module.exports = router;