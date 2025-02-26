const express = require("express");
const answerrouter = express.Router();
const answerController = require("../Controllers/Answer/AnswerController");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

answerrouter.use(authMiddleware);

// Route to add vote to an answer
answerrouter.post(
  "/addVote",
  roleMiddleware(["farmer", "expert"]),
  answerController.addVoteToAnswer
);

// Route to downvote an answer
answerrouter.post(
  "/downvote",
  roleMiddleware(["farmer", "expert"]),
  answerController.downvoteAnswer
);

// Route to get answers for a specific query
answerrouter.get(
  "/answers/:queryId",
  roleMiddleware(["farmer", "expert"]),
  answerController.getAnswersByQueryId
);

// Route to post an answer to a query
answerrouter.post(
  "/postAnswer",
  roleMiddleware(["farmer", "expert"]),
  answerController.postAnswerToQuery
);

//Total no of votes of specific query
answerrouter.get(
  "/votes/:answerId",
  roleMiddleware(["farmer", "expert"]),
  answerController.getVoteCount
);

// Route to get all answers by a specific expert user
answerrouter.get(
  "/expert/:email",
  roleMiddleware(["expert"]),
  answerController.getQueriesByExpertEmail
);

module.exports = answerrouter;
