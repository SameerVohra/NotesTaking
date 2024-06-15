import React from "react";

export const NewNote = ({ isFormVisible, onClick }) => {
  return (
    <div
      className={`fixed bottom-10 right-10 z-50 h-16 w-16 flex justify-center items-center text-4xl font-bold text-white rounded-full cursor-pointer shadow-lg transform transition-transform duration-200 ${
        isFormVisible
          ? "bg-red-600 hover:bg-red-700"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      onClick={onClick}
    >
      {isFormVisible ? "×" : "+"}
    </div>
  );
};
