const express = require("express")
const router = express.Router();

const authController = require("../users/controllers/auth.controller");
const questionController = require("./controllers/question.controller");


router.post("/:courseId", authController.protect, questionController.createQuestion);
router.get("/:courseId", authController.protect, questionController.getQuestions);
router.patch("/:courseId/:questionId", authController.protect, questionController.updateQuestion);


router.post("/:courseId/responses/:questionId", authController.protect, questionController.CreateResponse);
router.get("/:courseId/responses/:questionId", authController.protect, questionController.getResponses);


router.post("/:courseId/responses/:questionId/:commentId", authController.protect, questionController.createComment);
router.get("/:courseId/responses/:questionId/:commentId", authController.protect, questionController.getComment);


module.exports = router; 