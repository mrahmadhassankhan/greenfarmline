import React, { useState } from "react";
import { Axios_Node } from "../../../Axios";
import { toast } from "react-toastify";

const AnswerCard = ({
  answerId,
  queryId,
  isExpert,
  content,
  date,
  initialVotes,
  email,
  name,
  onVoteChange,
}) => {
  const [votes, setVotes] = useState(initialVotes); // Manage votes locally
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const handleUpvote = async () => {
    if (hasUpvoted) {
      toast.error("You have already upvoted this answer.");
      return;
    }

    try {
      const response = await Axios_Node.post("/answer/addVote", {
        queryId,
        answerId,
        email,
      });
      if (response.status === 200) {
        setVotes((prevVotes) => prevVotes + 1);
        toast.success("Upvoted successfully!");
        setHasUpvoted(true);
        if (hasDownvoted) {
          setHasDownvoted(false);
        }
        onVoteChange();
      }
    } catch (error) {
      console.error("Error during upvote:", error);
      toast.error("Failed to upvote. Please try again.");
    }
  };

  const handleDownvote = async () => {
    if (hasDownvoted) {
      toast.error("You have already downvoted this answer.");
      return;
    }

    try {
      const response = await Axios_Node.post("/answer/downVote", {
        queryId,
        answerId,
        email,
      });
      if (response.status === 200) {
        setVotes((prevVotes) => prevVotes - 1);
        toast.success("Downvoted successfully!");
        setHasDownvoted(true);
        if (hasUpvoted) {
          setHasUpvoted(false);
        }
        onVoteChange();
      }
    } catch (error) {
      console.error("Error during downvote:", error);
      toast.error("Failed to downvote. Please try again.");
    }
  };

  return (
    <div className="flex flex-row h-fit justify-between bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-start">
          <span className="font-bold text-gray-700">{name}</span>
          {isExpert === "expert" && (
            <span className="ml-2 px-2 py-1 text-xs bg-green-600 text-white rounded-full">
              Expert
            </span>
          )}
        </div>
        <p className="mt-2 text-gray-700">{content}</p>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-5 items-center">
          <svg
            onClick={handleUpvote}
            className={`cursor-pointer ${hasUpvoted ? "text-green-600" : ""}`}
            fill="#000000"
            height="32px"
            width="32px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333z" />
            <path d="M271.085,176.915c-8.331-8.331-21.839-8.331-30.17,0L134.248,283.582c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0L256,222.17l91.582,91.582c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17L271.085,176.915z" />
          </svg>
          <span className="text-sm text-gray-600 text-center">{votes}</span>
          <svg
            onClick={handleDownvote}
            className={`cursor-pointer ${hasDownvoted ? "text-red-600" : ""}`}
            fill="#000000"
            height="32px"
            width="32px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333z" />
            <path d="M347.582,198.248L256,289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17l106.667,106.667c8.331,8.331,21.839,8.331,30.17,0l106.667-106.667c8.331-8.331,8.331-21.839,0-30.17C369.42,189.917,355.913,189.917,347.582,198.248z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
