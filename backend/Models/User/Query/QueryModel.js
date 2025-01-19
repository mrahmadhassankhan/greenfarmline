const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  image: {
    type: String, // URL of the image
    default: null,
  },
  role: {
    type: String,
    required: true,
    enum: ["farmer", "expert", "seller"],
  },
  answers: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        default: "Expert",
      },
      answer: {
        type: String,
        required: true,
        trim: true,
      },
      dateAnswered: {
        type: Date,
        default: Date.now,
      },
      noOfVotes: {
        type: Number,
        default: 0,
      },
      voters: [
        {
          type: String, // Store the user email or ID to track who voted
        },
      ],
    },
  ],
});

// Method to add vote
QuerySchema.methods.addVote = function (answerId, email) {
  // Find the answer by its ID
  const answer = this.answers.id(answerId);
  if (!answer) return;

  // Add the vote
  answer.noOfVotes += 1;
  answer.voters.push(email);

  return this.save(); // Save the query document
};

// Method to downvote
QuerySchema.methods.downvote = function (answerId, email) {
  // Find the answer by its ID
  const answer = this.answers.id(answerId);
  if (!answer) return;

  // Decrease the vote count
  answer.noOfVotes -= 1;

  answer.voters.push(email);

  return this.save(); // Save the query document
};

const QueryModel = mongoose.model("Queries", QuerySchema);
module.exports = QueryModel;
