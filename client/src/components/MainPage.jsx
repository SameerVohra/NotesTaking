import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { NewNote } from "./NewNote";
import { NotesCard } from "./NotesCard";
import axios from "axios";

export const MainPage = () => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
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

  const handleDelete = async (id) => {
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

  const togglePin = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/pin/${id}`);
      console.log(response.data);
      fetchNotes(); // Fetch notes after updating pin status
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  return (
    <>
      {!isFormVisible && (
        <div className="flex flex-wrap flex-row justify-center gap-10 items-center p-10">
          {notes.map((note) => (
            <NotesCard
              key={note._id}
              title={note.title}
              tagline={note.tagline}
              body={note.body}
              onClick={() => handleDelete(note._id)}
              onClickPin={() => togglePin(note._id)}
              isPinned={note.isPinned}
            />
          ))}
        </div>
      )}

      {isFormVisible && (
        <div className="min-h-screen backdrop-blur-sm">
          <div className="flex flex-wrap justify-center items-center flex-col min-h-screen bg-opacity-70 backdrop-blur-3xl fixed inset-0 z-50">
            <h1 className="text-white">Add New Note</h1>
            <div className="flex flex-wrap px-6 py-2 border-2 border-white bg-yellow-200 rounded-3xl flex-col justify-center items-start">
              <Input
                label="Title"
                className="px-4 py-2 text-xl text-black"
                value={title}
                onChange={handleTitle}
              />
              <Input
                label="Tagline"
                className="px-4 py-2 text-xl text-black"
                value={tagline}
                onChange={handleTagline}
              />
              <h3>Body: </h3>
              <textarea
                rows={5}
                cols={40}
                placeholder="Enter Body..."
                value={body}
                onChange={handleBody}
              />
              <button
                className="border-2 border-black bg-white text-black mt-2"
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
