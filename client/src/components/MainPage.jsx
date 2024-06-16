import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { NewNote } from "./NewNote";
import { NotesCard } from "./NotesCard";
import axios from "axios";
import { Editing } from "./Editing";
import { Pagination } from "./Pagination";
import Alert from "@mui/material/Alert";

export const MainPage = () => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notesId, setNotesId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const notes_per_page = 6;

  setTimeout(() => {
    setIsErr(false);
  }, 10000);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTagline = (e) => {
    setTagline(e.target.value);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      const response = await axios.post(`http://localhost:3000/add-note`, {
        title,
        tagline,
        body,
      });
      console.log(response.data);

      setTitle("");
      setTagline("");
      setBody("");
      setIsFormVisible(false);
      fetchNotes(currentPage);
    } catch (error) {
      setIsErr(true);
      setErr(error.response.data);
    }
  };

  const fetchNotes = async (page = 1) => {
    try {
      setErr("");
      const response = await axios.get(
        `http://localhost:3000/fetch-notes?page=${page}&limit=${notes_per_page}`,
      );
      console.log(response.data);
      const sortedNotes = response.data.notes.sort((a, b) => {
        // Sort notes with pinned ones on top
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
      setNotes(sortedNotes);
      setTotalPages(Math.ceil(response.data.totalCount / notes_per_page));
    } catch (error) {
      setIsErr(true);
      setErr(error.response.data);
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes(currentPage);
  }, [currentPage]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      setErr("");
      const response = await axios.delete(
        `http://localhost:3000/delete-note/${id}`,
      );
      console.log(response.data);
      fetchNotes(currentPage); // Fetch notes after deleting a note
    } catch (error) {
      setIsErr(true);
      setErr(error.response.data);
      console.error("Error deleting note:", error);
    }
  };

  const toggleFormVisibility = () => {
    setErr("");
    setIsFormVisible(!isFormVisible);
  };

  const togglePin = async (id, e) => {
    e.stopPropagation();
    try {
      setErr("");
      const response = await axios.patch(`http://localhost:3000/pin/${id}`);
      console.log(response.data);
      fetchNotes(currentPage); // Fetch notes after updating pin status
    } catch (error) {
      setIsErr(true);
      setErr(error.response.data);
      console.error("Error pinning note:", error);
    }
  };

  const handleEdit = (id, e) => {
    e.preventDefault();
    setIsEditing(true);
    console.log("editing");
    setNotesId(id);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {isErr && err && (
        <div className="absolute top-0 left-0 right-0 z-50">
          <Alert severity="warning">{err}</Alert>
        </div>
      )}
      <div className="flex-grow">
        {!isFormVisible && !isEditing && (
          <div>
            <div className="flex flex-wrap flex-row justify-center gap-10 items-center p-10">
              {notes.map((note) => (
                <NotesCard
                  key={note._id}
                  title={note.title}
                  tagline={note.tagline}
                  body={note.body}
                  onClick={(e) => handleDelete(note._id, e)}
                  onClickPin={(e) => togglePin(note._id, e)}
                  handleEdit={(e) => handleEdit(note._id, e)}
                  isPinned={note.isPinned}
                />
              ))}
            </div>
          </div>
        )}

        {isEditing && <Editing id={notesId} setIsEditing={setIsEditing} />}

        {isFormVisible && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
                Add New Note
              </h1>
              <div className="space-y-4">
                <Input
                  label="Title"
                  className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800"
                  value={title}
                  onChange={handleTitle}
                />
                <Input
                  label="Tagline"
                  className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800"
                  value={tagline}
                  onChange={handleTagline}
                />
                <label className="block text-lg font-medium text-gray-700">
                  Body:
                </label>
                <textarea
                  rows={5}
                  placeholder="Enter Body..."
                  className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800"
                  value={body}
                  onChange={handleBody}
                />
                <button
                  className="w-full px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSubmit}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <NewNote isFormVisible={isFormVisible} onClick={toggleFormVisibility} />
      <div className="flex justify-center items-center mt-4 mb-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
