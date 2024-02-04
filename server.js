// require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/songs", {
  retryWrites: true,
  w: "majority",
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const songsRouter = require("./routes/songs");
app.use("/songs", songsRouter);

app.listen(3000, () => console.log("Server Started"));
