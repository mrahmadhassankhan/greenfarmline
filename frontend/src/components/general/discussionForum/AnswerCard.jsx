import React from 'react';

const AnswerCard = ({ author, isExpert, content, date, upvotes, downvotes }) => {
    return (
        <>
        <div className='flex flex-row justify-between bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex flex-col items-start'>
                <div className='flex flex-row items-start'>
                <span className="font-bold text-gray-700">{author}</span>
                    {isExpert && (
                        <span className="ml-2 px-2 py-1 text-xs bg-lime-500 text-white rounded-full">
                            Expert
                        </span>
                    )}
                </div>
                <div>
                    <p className="mt-2 text-gray-700">{content}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">{date}</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className='flex flex-col gap-5'>
                <button className="w-28 px-4 py-1 bg-lime-500 text-white text-sm rounded hover:bg-lime-600">
                    upvote
                </button>
                <span className="text-sm text-gray-600 text-center">{upvotes - downvotes}</span>
                <button className="w-28 px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                    downvote
                </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default AnswerCard;