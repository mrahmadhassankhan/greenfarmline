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
                        <p><svg className='cursor-pointer' fill="#000000" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 512 512" xml:space="preserve">
                            <g>
                                <g>
                                    <g>
                                        <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
				c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
				z"/>
                                        <path d="M271.085,176.915c-8.331-8.331-21.839-8.331-30.17,0L134.248,283.582c-8.331,8.331-8.331,21.839,0,30.17
				c8.331,8.331,21.839,8.331,30.17,0L256,222.17l91.582,91.582c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17
				L271.085,176.915z"/>
                                    </g>
                                </g>
                            </g>
                        </svg></p>
                        <span className="text-sm text-gray-600 text-center">{upvotes - downvotes}</span>
                        <p><svg className='cursor-pointer' fill="#000000" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 512 512" xml:space="preserve">
                            <g>
                                <g>
                                    <g>
                                        <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
				c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
				z"/>
                                        <path d="M347.582,198.248L256,289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17
				l106.667,106.667c8.331,8.331,21.839,8.331,30.17,0l106.667-106.667c8.331-8.331,8.331-21.839,0-30.17
				C369.42,189.917,355.913,189.917,347.582,198.248z"/>
                                    </g>
                                </g>
                            </g>
                        </svg></p>
                        {/* <button className="w-28 px-4 py-1 bg-lime-500 text-white text-sm rounded hover:bg-lime-600">
                            upvote
                        </button>
                        <span className="text-sm text-gray-600 text-center">{upvotes - downvotes}</span>
                        <button className="w-28 px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                            downvote
                        </button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnswerCard;