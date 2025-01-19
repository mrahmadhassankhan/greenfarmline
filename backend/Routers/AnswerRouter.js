const express = require("express");
const answerrouter = express.Router();
const answerController = require("../Controllers/Answer/AnswerController");

// Route to add vote to an answer
answerrouter.post("/addVote", answerController.addVoteToAnswer);

// Route to downvote an answer
answerrouter.post("/downvote", answerController.downvoteAnswer);

// Route to get answers for a specific query
answerrouter.get("/answers/:queryId", answerController.getAnswersByQueryId);

// Route to post an answer to a query
answerrouter.post("/postAnswer", answerController.postAnswerToQuery);

//Total no of votes of specific query
answerrouter.get("/votes/:answerId", answerController.getVoteCount);

// Route to get all answers by a specific expert user
answerrouter.get("/expert/:email", answerController.getQueriesByExpertEmail);

module.exports = answerrouter;
