require("dotenv").config();
const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const postsGenreController = async (name) => {
  const created = await Genre.create({ name: name });
  return created;
};

// GET GENRES
const getGenres = async () => {
  const genresDb = await Genre.findAll();
  if (!genresDb.length) {
    const { data } = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const allGenres = data?.results.map((genre) => genre.name);
    allGenres.forEach(async (g) => await Genre.create({ name: g }));
  }
  return genresDb;
};

module.exports = { getGenres, postsGenreController };
