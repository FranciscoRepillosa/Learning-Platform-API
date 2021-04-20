const Question = require("../models/question.models");
const Response = require("../../Responses/models/response.models");

exports.createQuestion = async (req, res) => {
    const newQuestion = await Question.create({
        courseId: req.params.courseId,
        userId: req.user._id,
        message: req.body.message,
        responses: 0,
        userName: req.user.name
    });

    res.status(201).json({
        status: "success",
        data : {
            newQuestion
        }
    });
};

exports.getQuestions = async (req, res) => {
    if(req.query.searchInput) {
        const regex = new RegExp(req.query.searchInput, 'i')
        const questions = await Course.find( {name: {$regex: regex} } );
        
        return res.status(200).json({
          status: "success",
          results: questions.length,
          data : {
            questions
          }
        })
    }
    const questions = await Question.find({ courseId: req.params.courseId });

    res.status(200).json({
        status: "success",
        data : {
            questions
        }
    });
};

exports.updateQuestion = async (req, res) => {
    const oldQuestion = await Question.findById(req.params.questionId);
    
    if ( oldQuestion.userId === req.user._id.toString() ) {
        
        oldQuestion.message = req.body.message;
        
        oldQuestion.save();

        return res.status(201).json({
            status: "success",
            data : {
                oldQuestion
            }
        });
    }

    res.status(400).json({
        status: "denied",
        message: "you can't do this operation"
    });

}


exports.CreateResponse = async (req, res) => {
    const newResponse = await Response.create({
        parentId: req.params.questionId,
        userId: req.user._id,
        message: req.body.message,
        userName: req.user.name,
    });

    const addComment = await Question.findById(req.params.questionId);
    addComment.responses += 1;
    addComment.save(); 
    console.log(addComment);

    res.status(200).json({
        status: "success",
        data : {
            newResponse,
            addComment
        }
    });
}

exports.getResponses = async (req, res) => {
    const responses = await Response.find({parentId: req.params.questionId});

    res.status(200).json({
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