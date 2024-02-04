import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
});

export const Song = mongoose.model("Song", songSchema);
