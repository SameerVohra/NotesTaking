import React, { useState } from "react";

export const NotesCard = ({
  title,
  tagline,
  body,
  onClick,
  isPinned,
  onClickPin,
}) => {
  return (
    <div className="bg-yellow-400 p-6 m-4 rounded-3xl shadow-lg max-w-md w-full">
      <p className="text-right text-gray-500 cursor-pointer" onClick={onClick}>
        x
      </p>
      <h1 className="text-3xl font-bold mb-2">Title: {title}</h1>
      <h3 className="text-2xl font-semibold mb-2">Tagline: {tagline}</h3>
      <p className="text-xl leading-relaxed">Body: {body}</p>
      <p className="text-right text-xl cursor-pointer" onClick={onClickPin}>
        {!isPinned ? "📍" : "📌"}
      </p>
    </div>
  );
};
