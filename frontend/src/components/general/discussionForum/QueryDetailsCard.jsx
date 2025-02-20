import React from "react";

const QueryDetailsCard = ({
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
      className=" bg-white text-black relative h-fit flex flex-col dark:bg-slate-900 dark:border md:flex-row items-start  shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full md:w-1/3 h-40 object-cover rounded-lg md:mr-4"
        />
      )}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-green-600">{title}</h3>
        <p className="text-sm dark:text-white text-gray-600 my-2 mb-9">
          {description}
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

export default QueryDetailsCard;
