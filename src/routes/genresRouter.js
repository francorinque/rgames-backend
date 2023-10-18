const { Router } = require("express");
const {
  getGenresHandler,
  postGenreHandler,
} = require("../handlers/getGenresHandler");

const genresRouter = Router();

genresRouter.get("/", getGenresHandler);
genresRouter.post("/", postGenreHandler);

module.exports = genresRouter;
