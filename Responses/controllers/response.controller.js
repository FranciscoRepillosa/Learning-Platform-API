const Response = require("../models/response.models");
const Question = require("../../Questions/models/question.models");


exports.createResponse = async (req, res) => {
    const newResponse = await Response.create({
        parentId: req.params.questionId,
        userId: req.user._id,
        message: req.body.message,
        userName: req.user.name,
    });

        const addComment = await Question.findById(req.params.questionId);
        addComment.responses += 1;
        addComment.save(); 
    
        return res.status(200).json({
            status: "success",
            data : {
                newResponse,
                addComment
            }
        });
}

exports.getResponses = async (req, res) => {
    
    const responses = await Response.find({parentId: req.params.questionId});

    return res.status(200).json({
        status: "success",
        data : {
           responses
        }
    });
}

























exports.createComment = async (req, res) => {
    const newResponse = await Response.create({
        parentId: req.params.commentId,
        userId: req.user._id,
        message: req.body.message,
        userName: req.user.name,
    });

    res.status(201).json({
        status: "success",
        data : {
            newResponse
        }
    });
}

exports.getComment = async (req, res) => {
    const responses = await Response.find({parentId: req.params.commentId});

    res.status(200).json({
        status: "success",
        data : {
           responses
        }
    });
}