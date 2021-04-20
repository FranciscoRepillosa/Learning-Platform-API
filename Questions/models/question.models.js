const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({   
    courseId: {
        type: String,
        required: [true, "the question most belong to a course"]
    },
    userId: {
        type: String,
        required: [true, "the question most belong to a user"]
    },
    message: {
        type: String,
        required: [true, "the question can't be empty"]
    },
    responses: Number,
    userName: String

});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;

