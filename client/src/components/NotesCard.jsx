import React from "react";

export const NotesCard = ({
  title,
  tagline,
  body,
  onClick,
  isPinned,
  onClickPin,
  handleEdit,
}) => {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    onClickPin(e);
  };

  return (
    <div
      className="bg-yellow-400 p-6 m-4 rounded-2xl shadow-2xl max-w-md w-full cursor-pointer transform transition-transform hover:scale-105 hover:shadow-yellow-400"
      onClick={handleEdit}
    >
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold">Title: {title}</h1>
        <button
          className="text-gray-800  font-bold hover:text-gray-300 text-2xl"
          onClick={handleDeleteClick}
        >
          x
        </button>
      </div>
      <h3 className="text-2xl font-semibold mb-2">Tagline: {tagline}</h3>
      <p className="text-xl leading-relaxed mb-4">Body: {body}</p>
      <div className="flex justify-end">
        <button
          className="text-2xl hover:text-yellow-600"
          onClick={handlePinClick}
        >
          {!isPinned ? "📍" : "📌"}
        </button>
      </div>
    </div>
  );
};
