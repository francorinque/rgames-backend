const {
  getGenres,
  postsGenreController,
} = require("../controllers/genresController");

const getGenresHandler = async (req, res) => {
  try {
    const genres = await getGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postGenreHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const created = await postsGenreController(name);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getGenresHandler, postGenreHandler };
