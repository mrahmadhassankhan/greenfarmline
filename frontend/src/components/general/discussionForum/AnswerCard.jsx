import React from 'react';

const AnswerCard = ({ author, isExpert, content, date, ratings }) => {
    return (
        <div className="flex flex-col bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <span className="font-bold text-gray-700">{author}</span>
                    {isExpert && (
                        <span className="ml-2 px-2 py-1 text-xs bg-lime-500 text-white rounded-full">
                            Expert
                        </span>
                    )}
                </div>
                <span className="text-sm text-gray-500">{date}</span>
            </div>
            <p className="mt-2 text-gray-700">{content}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">Ratings: {ratings}</span>
                <button className="px-4 py-1 bg-lime-500 text-white text-sm rounded hover:bg-lime-600">
                    Rate
                </button>
            </div>
        </div>
    );
};

export default AnswerCard;