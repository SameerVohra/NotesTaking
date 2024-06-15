import React, { useState } from "react";

export const Input = ({ label, className, ...props }) => {
  return (
    <>
      <div>
        <form>
          <h3 className="text-black">{label}: </h3>
          <input
            placeholder={`Enter ${label}...`}
            className={`${className}`}
            {...props}
          />
        </form>
      </div>
    </>
  );
};
