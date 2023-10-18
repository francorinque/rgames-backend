require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { API_URL, API_KEY } = process.env;
const cleanArray = require("../helpers/cleanArray");
const cleanObject = require("../helpers/cleanObject");

// ALLGAMES
const getGamesDatabase = async () => {
  return await Videogame.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Genre,
        as: "genres",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

const getAllGames = async () => {
  async function fetchGames(page) {
    const endpoint = `${API_URL}?key=${API_KEY}&page=${page}&page_size=25`;
    return (await axios.get(endpoint)).data.results;
  }

  const pageCount = 4;
  const promises = [];
  for (let i = 1; i <= pageCount; i++) {
    promises.push(fetchGames(i));
  }
  const vGamesApi = await Promise.all(promises); // [[],[],[]]
  const vGamesDatabase = await getGamesDatabase();

  const cleanvGames = cleanArray(vGamesApi.flat());
  return [...vGamesDatabase, ...cleanvGames];
};

//BY ID
const getGameById = async ({ id, source }) => {
  try {
    let game = null;
    if (source === "dbb") {
      game = await Videogame.findByPk(id, {
        include: {
          model: Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      });
    } else {
      const gameApi = (await axios.get(`${API_URL}/${id}?key=${API_KEY}`)).data;
      game = cleanObject(gameApi);
    }
    return game;
  } catch (error) {
    throw Error("Videogame not found");
  }
};

// BY NAME

const getGameByName = async (name) => {
  console.log(name);
  const gamesFoundApi = (
    await axios.get(`${API_URL}?key=${API_KEY}&search=${name}`)
  ).data.results.filter((g) =>
    g.name.toLowerCase().includes(name.toLowerCase())
  );

  const gamesFoundDatabase = await Videogame.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
    include: [
      {
        model: Genre,
        as: "genres",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!gamesFoundApi.length && !gamesFoundDatabase.length)
    throw Error(`${name} not found`);

  const cleanGamesApi = cleanArray(gamesFoundApi);
  const cleanGamesDatabase = cleanArray(gamesFoundDatabase);

  return [...cleanGamesDatabase, ...cleanGamesApi];
};

// POST GAME
const postGame = async (videogame) => {
  let allGames = await Videogame.findAll();
  let videogameFound = allGames.find(
    (el) => el.name.toLowerCase() === videogame.name.toLowerCase()
  );

  console.log(videogameFound);

  if (videogameFound) {
    throw Error(
      `The ${videogame.name} video game already exists,please create another one.`
    );
  } else {
    const newVideogame = await Videogame.create({
      name: videogame.name,
      description: videogame.description,
      image: videogame.image,
      release_date: videogame.release_date,
      platforms: videogame.platforms,
      rating: videogame.rating,
    });

    for (const g of videogame.genres) {
      const genre = await Genre.findOne({
        where: { name: g },
      });
      if (genre) {
        await newVideogame.addGenres(genre);
      }
    }

    return newVideogame;
  }
};

// DELETE GAME
const deleteGame = async (id) => {
  const gameFound = await Videogame.findByPk(id);
  if (gameFound) {
    await gameFound.destroy();
  }
};

module.exports = {
  getAllGames,
  getGameById,
  getGameByName,
  postGame,
  deleteGame,
};
