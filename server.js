// require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions.js");

mongoose.connect("mongodb://localhost/songs", {
  retryWrites: true,
  w: "majority",
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors(corsOptions));

const songsRouter = require("./routes/songs");
app.use("/songs", songsRouter);

app.listen(8080, () => console.log("Server Started"));
