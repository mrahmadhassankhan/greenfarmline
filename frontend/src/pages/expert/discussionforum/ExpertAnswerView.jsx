import React, { useState, useEffect } from "react";
import { Axios_Node } from "../../../Axios";
import ExpertNav from "../ExpertNav";
import AnswerCard from "../../../components/general/discussionForum/AnswerCard";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import QueryDetailsCard from "../../../components/general/discussionForum/QueryDetailsCard";

function ExpertAnswerView() {
  const location = useLocation();
  const { query } = location.state || {};
  const [votes, setVotes] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch answers on component mount
  useEffect(() => {
    if (query) {
      Axios_Node.get(`/answer/answers/${query._id}`)
        .then((response) => {
          setAnswers(response.data.answers);
        })
        .catch((error) => {
          console.error("Error fetching answers:", error);
        });
    }
  }, [query]);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userData = {
      name: JSON.parse(localStorage.getItem("user")).name,
      email: JSON.parse(localStorage.getItem("user")).email,
      role: JSON.parse(localStorage.getItem("user")).role,
    };

    const newAnswerObj = {
      queryId: query._id,
      name: userData.name,
      email: userData.email,
      answer: newAnswer,
      role: userData.role,
    };

    Axios_Node.post("/answer/postanswer", newAnswerObj)
      .then((response) => {
        setNewAnswer(""); // Clear the textarea
        setIsSubmitting(false);
        toast.success("Answer Submitted Successfully");
        Axios_Node.get(`/answer/answers/${query._id}`)
          .then((res) => {
            setAnswers(res.data.answers);
          })
          .catch((err) => {
            console.error("Error fetching updated answers:", err);
          });
      })
      .catch((error) => {
        console.error("Error posting answer:", error);
        setIsSubmitting(false);
      });
  };

  if (!query) {
    return <p className="text-red-500">No query selected.</p>;
  }

  return (
    <>
      <ExpertNav />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Discussion Forum
        </h1>
        {/* Query Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Query#</h2>

          <QueryDetailsCard
            key={query._id}
            title={query.title}
            description={query.description}
            author={query.name}
            date={new Date(query.datePosted).toLocaleDateString()}
            image={`https://api.greenfarmline.shop/Images/${query.image}`}
            status={query.status}
          />
        </div>

        {/* Existing Answers */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Answers</h2>
          {answers.map((answer) => (
            <AnswerCard
              key={answer._id}
              queryId={query._id}
              answerId={answer._id}
              name={answer.name}
              isExpert={answer.role}
              content={answer.answer}
              date={new Date(answer.dateAnswered).toLocaleDateString()}
              initialVotes={answer.noOfVotes} // Pass initial votes
              email={answer.email}
              onVoteChange={() => {
                Axios_Node.get(`/answer/answers/${query._id}`)
                  .then((response) => setAnswers(response.data.answers))
                  .catch((err) => console.error(err));
              }}
            />
          ))}
        </div>

        {/* Answer Submission Form */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Write Your Answer</h2>
          <form onSubmit={handleAnswerSubmit} className="space-y-4">
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              required
              rows="4"
              placeholder="Write your answer here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 text-white font-semibold rounded-lg ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ExpertAnswerView;
