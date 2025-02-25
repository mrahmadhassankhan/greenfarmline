const QueryModel = require("../../Models/User/Query/QueryModel");

const addVoteToAnswer = async (req, res) => {
  const { queryId, answerId, email } = req.body;

  try {
    // Find the query by its ID
    const query = await QueryModel.findById(queryId);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    // Find the answer by its ID within the query's answers array
    const answer = query.answers.id(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // Add the vote
    await query.addVote(answerId, email); // Pass the answerId and email

    // Return the updated answer object
    const updatedAnswer = query.answers.id(answerId);
    return res
      .status(200)
      .json({ message: "Vote added successfully", answer: updatedAnswer });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const downvoteAnswer = async (req, res) => {
  const { queryId, answerId, email } = req.body;

  try {
    // Find the query by its ID
    const query = await QueryModel.findById(queryId);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    // Find the answer by its ID within the query's answers array
    const answer = query.answers.id(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // Downvote the answer
    await query.downvote(answerId, email); // Pass the answerId and email

    // Return the updated answer object
    const updatedAnswer = query.answers.id(answerId);
    return res
      .status(200)
      .json({ message: "Downvote added successfully", answer: updatedAnswer });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getVoteCount = async (req, res) => {
  const { answerId } = req.params;

  try {
    // Find the answer by its ID
    const answer = await QueryModel.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // Return the pre-calculated total votes
    return res.status(200).json({
      noOfVotes: answer.noOfVotes, // Assuming "totalVotes" is the field storing the calculated votes
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Method to get answers for a specific query
const getAnswersByQueryId = async (req, res) => {
  const { queryId } = req.params;

  try {
    // Find the query by ID and populate answers
    const query = await QueryModel.findById(queryId).populate("answers");
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    return res.status(200).json({ answers: query.answers });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Method to post an answer to a query
const postAnswerToQuery = async (req, res) => {
  try {
    const { queryId, name, email, answer, role } = req.body;

    // Validate input
    if (!queryId || !name || !email || !answer || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the query by queryId
    const query = await QueryModel.findById(queryId);
    if (!query) {
      return res.status(404).json({ message: "Query not found." });
    }

    // Add the answer to the query's answers array
    query.answers.push({
      name,
      email,
      answer,
      role,
      dateAnswered: new Date(),
    });

    // Save the query with the new answer
    await query.save();

    return res
      .status(201)
      .json({ message: "Answer posted successfully.", query });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const getQueriesByExpertEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Find all queries where the expert has answered
    const queries = await QueryModel.find({
      "answers.email": email, // Match answers by the specified expert email
    });

    // Return an empty array with a 200 status instead of 404
    return res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching queries by expert:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching queries by expert" });
  }
};

module.exports = {
  addVoteToAnswer,
  downvoteAnswer,
  getAnswersByQueryId,
  postAnswerToQuery,
  getVoteCount,
  getQueriesByExpertEmail,
};
