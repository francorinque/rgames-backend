const {
  getGameByName,
  getAllGames,
  getGameById,
  postGame,
  deleteGame,
} = require("../controllers/videogamesController");

//GET ALL GAMES HANDLER
const getGamesHandler = async (req, res) => {
  try {
    const { name } = req.query; // name=fifa
    const results = name ? await getGameByName(name) : await getAllGames();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID HANDLER
const getGameByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    let source = isNaN(id) ? "dbb" : "api";
    let detailGame = await getGameById({ id, source });
    res.status(200).json(detailGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//POST HANDLER
const postGameHandler = async (req, res) => {
  try {
    const videogame = req.body;
    const newVideogame = await postGame(videogame);
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE HANDLER
const deleteGameHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteGame(id);
    res.status(200).json({ message: "The videogame was deleted succesfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGamesHandler,
  getGameByIdHandler,
  postGameHandler,
  deleteGameHandler,
};
