const mongoose = require("mongoose");

const NotesModel = new mongoose.Schema({
  title: String,
  tagline: String,
  body: String,
  isPinned: Boolean,
  notesId: Date,
});

const Notes = mongoose.model("Notes", NotesModel);

module.exports = Notes;
