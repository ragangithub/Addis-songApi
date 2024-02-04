const express = require("express");
const router = express.Router();
const Song = require("../models/song");

// Getting all
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getSong, (req, res) => {
  res.json(res.song);
});

// Creating one
router.post("/", async (req, res) => {
  const { title, artist, album, genre } = req.body;
  const song = new Song({
    title,
    artist,
    album,
    genre,
  });
  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getSong, async (req, res) => {
  if (req.body.title != null) {
    res.song.title = req.body.title;
  }
  if (req.body.artist != null) {
    res.song.artist = req.body.artist;
  }
  if (req.body.album != null) {
    res.song.album = req.body.album;
  }
  if (req.body.genre != null) {
    res.song.genre = req.body.genre;
  }
  try {
    const updatedSong = await res.song.save();
    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getSong, async (req, res) => {
  try {
    await res.song.remove();
    res.json({ message: "Deleted Song" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSong(req, res, next) {
  let song;
  try {
    song = await Song.findById(req.params.id);
    if (song == null) {
      return res.status(404).json({ message: "Cannot find song" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.song = song;
  next();
}

module.exports = router;
