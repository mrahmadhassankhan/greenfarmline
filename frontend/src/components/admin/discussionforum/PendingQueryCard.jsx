import React from 'react';

const PendingQueryCard = ({ 
    title, 
    description, 
    author, 
    date, 
    image, 
    status, 
    onClick, 
    onApprove, 
    onReject 
}) => {
    const getBadgeStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-400 text-white";
            case "Approved":
                return "bg-green-500 text-white";
            case "Rejected":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-400 text-white";
        }
    };

    return (
        <div  
            className="relative flex flex-col md:flex-row items-start bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
        >
            {image && (
                <img onClick={onClick}
                    src={image}
                    alt={title}
                    className="w-full md:w-1/3 h-40 object-cover rounded-lg md:mr-4 cursor-pointer"
                />
            )}
            <div className="flex-1">
                <h3 onClick={onClick} className="text-xl font-bold text-lime-600 cursor-pointer">{title}</h3>
                <p className="text-sm text-gray-600 my-2">
                    {description.length > 120 ? `${description.slice(0, 120)}...` : description}
                </p>
                <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                    <span>Posted by: {author}</span>
                    <span>{date}</span>
                </div>
            </div>

            {/* Badge */}
            <span
                className={`absolute bottom-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${getBadgeStyle(status)}`}
            >
                {status}
            </span>

            {/* Action Buttons */}
            {status === "Pending" && (
                <div className="mt-4 flex space-x-2">
                    <button
                        onClick={onApprove}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Approve
                    </button>
                    <button
                        onClick={onReject}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
};

export default PendingQueryCard;