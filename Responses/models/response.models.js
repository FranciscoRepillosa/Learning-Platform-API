const mongoose = require("mongoose");

const ResponseSchema = mongoose.Schema({
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

const Response = mongoose.model("Response", ResponseSchema);

module.exports = Response;
