import React from "react";

const QueryCard = ({
  title,
  description,
  author,
  date,
  image,
  status,
  onClick,
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
      onClick={onClick}
      className=" bg-white border text-black relative flex flex-col dark:bg-slate-900 dark:border md:flex-row items-start  shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full md:w-1/3 h-40 object-cover rounded-lg md:mr-4"
        />
      )}
      <div className="flex-1 w-full md:w-1/2">
        <h3 className="text-xl font-bold text-green-600 overflow-hidden break-words max-h-8 max-w-full">
          {title}
        </h3>
        <p className="text-sm dark:text-white text-gray-600 overflow-hidden break-words max-h-20 max-w-full my-2">
          {description.length > 120
            ? `${description.slice(0, 120)}...`
            : description}
        </p>
        <div className="absolute bottom-4 flex gap-28 items-center text-gray-500 text-sm">
          <span>Posted by: {author}</span>
          <span>{date}</span>
        </div>
      </div>

      {/* Badge */}
      <span
        className={`absolute bottom-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${getBadgeStyle(
          status
        )}`}
      >
        {status}
      </span>
    </div>
  );
};

export default QueryCard;
