const express = require("express");
const { default: mongoose } = require("mongoose");
const app = require("./App.js");

const port = 3000;

mongoose
  .connect(
    "mongodb+srv://sameervohra943:BtgHl3LKLW1Ruydu@cluster0.qzmu3zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => console.log("Connected Successfully"))
  .catch((error) => console.log(error));

app.get("/test", (req, res) => {
  console.log("Testing");
  res.send("Testing successful");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
