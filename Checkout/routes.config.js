const express = require("express")
const router = express.Router();
const checkoutController = require("./controllers/checkout.controller");

router.post("/:courseId", checkoutController.getClientSecret);

router.get("/:courseId", checkoutController.renderCheckoutPage)


module.exports = router;