import React, { useState } from 'react';
import UserNav from '../UserNav';
import AnswerCard from '../../../components/general/discussionForum/AnswerCard';
import QueryCard from '../../../components/general/discussionForum/QueryCard';
import SideBar from '../../../components/user/discussionforum/SideBar';

function QueryDetailedView() {
    const [answers, setAnswers] = useState([
        {
            id: 1,
            author: "Expert Smith",
            isExpert: true,
            content: "You should use eco-friendly pesticides and ensure proper soil treatment before planting.",
            date: "2024-12-20",
            upvotes: 17,
            downvotes: 6,
        },
        {
            id: 2,
            author: "David",
            isExpert: false,
            content: "You should use eco-friendly pesticides and ensure proper soil treatment before planting.",
            date: "2024-12-25",
            upvotes: 27,
            downvotes: 2,
        },
    ]);

    const [newAnswer, setNewAnswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const queries = [
        {
            id: 1,
            title: "How to prevent pests in wheat crops?",
            description: "I’ve noticed some damage in my wheat crops. What is the best way to deal with pests and ensure a healthy yield?",
            author: "Farmer John",
            date: "2024-12-19",
            image: "https://via.placeholder.com/150",
            status: "Approved",
        },
    ];

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate a server request for adding an answer
        setTimeout(() => {
            const newAnswerObj = {
                id: answers.length + 1,
                author: "Current User", // Replace with logged-in user data
                isExpert: false, // Replace with user role logic
                content: newAnswer,
                date: new Date().toISOString().split('T')[0],
                upvotes: 0,
                downvotes: 0,
            };

            setAnswers((prevAnswers) => [...prevAnswers, newAnswerObj]);
            setNewAnswer("");
            setIsSubmitting(false);
        }, 1000); // Simulate 1-second delay
    };

    return (
        <>
            <UserNav />
            <div className='flex'>
                {/* Side Panel */}
                <SideBar />

                {/* Main Content */}
                <main className="w-3/4 max-w-7xl mx-auto p-6">
                    <div className="max-w-7xl mx-auto p-6">
                        <h1 className="text-3xl font-bold text-center mb-6">Discussion Forum</h1>
                        {/* Query Details */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Query#</h2>
                            {queries.map((query) => (
                                <QueryCard
                                    key={query.id}
                                    title={query.title}
                                    description={query.description}
                                    author={query.author}
                                    date={query.date}
                                    image={query.image}
                                    status={query.status}
                                    onClick={() => console.log(`Navigating to query ID: ${query.id}`)}
                                />
                            ))}
                        </div>

                        {/* Existing Answers */}
                        <div className="mt-8 space-y-4">
                            <h2 className="text-2xl font-semibold">Answers</h2>
                            {answers.map((answer) => (
                                <AnswerCard
                                    key={answer.id}
                                    author={answer.author}
                                    isExpert={answer.isExpert}
                                    content={answer.content}
                                    date={answer.date}
                                    upvotes={answer.upvotes}
                                    downvotes={answer.downvotes}
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
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full p-3 text-white font-semibold rounded-lg ${isSubmitting
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-lime-500 hover:bg-lime-600"
                                        }`}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Answer"}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default QueryDetailedView;