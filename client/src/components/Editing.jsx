import axios from "axios";
import React, { useEffect, useState } from "react";

export const Editing = ({ id }) => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `https://notes-taking-swart.vercel.app/${id}`,
        );
        console.log(response);
        setTitle(response.data.title);
        setTagline(response.data.tagline);
        setBody(response.data.body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNote();
  }, [id]);

  const updateNote = async () => {
    try {
      const res = await axios.post(
        `https://notes-taking-swart.vercel.app/edit`,
        {
          title,
          tagline,
          body,
          id,
        },
      );
      if (res.status === 201) {
        console.log(res);
        window.location.reload();
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEditing = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Note
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Body
            </label>
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={updateNote}
              className="w-full px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              className="w-full px-4 py-2 text-lg font-bold text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
