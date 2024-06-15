import React from "react";

export const NewNote = ({ isFormVisible, onClick }) => {
  return (
    <div
      className={`h-fit w-fit px-10 py-4 text-center flex justify-center items-center text-3xl rounded-full fixed bottom-10 right-10 cursor-pointer ${
        isFormVisible ? "bg-red-700" : "bg-blue-400"
      }`}
      onClick={onClick}
    >
      {isFormVisible ? "x" : "+"}
    </div>
  );
};
