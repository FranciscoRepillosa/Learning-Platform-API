const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    parentId: {
        type: String,
        required: [true, "the responses most belong to a question"]
    },
    userId: {
        type: String,
        required: [true, "the question most belong to a user"]
    },
    message:  {
        type: String,
        required: [true, "the responses can't be empty"]
    },
    responses: Number,
    userName: String
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
