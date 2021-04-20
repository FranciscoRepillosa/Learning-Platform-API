const express = require("express");
const router = express.Router();

const reviewController = require("./controllers/review.controller");
const authController = require("../users/controllers/auth.controller");

router.post("/:courseId", authController.protect, reviewController.createReview);
router.get("/:courseId", authController.protect, reviewController.getReviews);

module.exports = router;

