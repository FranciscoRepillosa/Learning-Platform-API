const express = require("express")
const router = express.Router();
const checkoutController = require("./controllers/checkout.controller");
const authController = require("../users/controllers/auth.controller");

router.post("/:courseId", checkoutController.getClientSecret);

router.get("/:courseId", authController.protect ,checkoutController.renderCheckoutPage)


module.exports = router;