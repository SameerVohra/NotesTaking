import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { NewNote } from "./NewNote";
import { NotesCard } from "./NotesCard";
import axios from "axios";
import { Editing } from "./Editing";

export const MainPage = () => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notesId, setNotesId] = useState(null);
  const [notes, setNotes] = useState([]);

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
      if (!title || !tagline || !body) {
        console.log("All fields are required");
        return;
      }

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
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/fetch-notes`);
      const sortedNotes = response.data.sort((a, b) => {
        // Sort notes with pinned ones on top
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
      setNotes(sortedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete-note/${id}`,
      );
      console.log(response.data);
      fetchNotes(); // Fetch notes after deleting a note
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const togglePin = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await axios.patch(`http://localhost:3000/pin/${id}`);
      console.log(response.data);
      fetchNotes(); // Fetch notes after updating pin status
    } catch (error) {
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
    <>
      {!isFormVisible && !isEditing && (
        <div className="flex flex-wrap flex-row justify-start gap-10 items-center p-10">
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
      )}

      {isEditing && <Editing id={notesId} setIsEditing={setIsEditing} />}

      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
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
      <NewNote isFormVisible={isFormVisible} onClick={toggleFormVisibility} />
    </>
  );
};
