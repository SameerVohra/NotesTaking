const {
  AddNotes,
  FetchNotes,
  DeleteNote,
  PinNotes,
} = require("../Controllers/controllers");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

app.post("/add-note", AddNotes);
app.get("/fetch-notes", FetchNotes);
app.delete("/delete-note/:id", DeleteNote);
app.patch("/pin/:id", PinNotes);
module.exports = app;
