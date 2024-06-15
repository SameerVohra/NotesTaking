const Notes = require("../Models/NotesModel");

const AddNotes = async (req, res) => {
  const { title, tagline, body } = req.body;

  try {
    if (!title || !tagline || !body) {
      return res.status(400).send("All fields are required");
    }

    const newNote = new Notes({
      title,
      tagline,
      body,
      isPinned: false,
      notesId: Date.now(),
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).send("Internal server error");
  }
};

const FetchNotes = async (req, res) => {
  try {
    const data = await Notes.find({}, "title tagline body isPinned notesId");

    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
};

const DeleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Notes.findOneAndDelete({ _id: id });
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
};

const PinNotes = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Notes.findOne({ _id: id });
    data.isPinned = !data.isPinned;
    await data.save();
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
};

const FindNotes = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Notes.findOne({ _id: id });
    console.log(note);
    res.status(200).send(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const EditNote = async (req, res) => {
  const { id, title, tagline, body } = req.body;
  try {
    const note = await Notes.findOneAndUpdate(
      { _id: id },
      { title: title, tagline: tagline, body: body },
    );
    console.log(note);
    res.status(201).send(note);
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
};

module.exports = {
  AddNotes,
  FetchNotes,
  DeleteNote,
  PinNotes,
  FindNotes,
  EditNote,
};
