const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions.js");

const { config } = require("./config/config");

mongoose.connect(`${config.mongo.url}/songs`, {
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

app.listen(config.server.port, () => console.log("Server Started"));
