const { Router } = require('express')
const {
	getGamesHandler,
	getGameByIdHandler,
	postGameHandler,
	deleteGameHandler,
} = require('../handlers/videogamesHandler')

const videogamesRouter = Router()

//GET /
videogamesRouter.get('/', getGamesHandler)

// GET /:idVideogame
videogamesRouter.get('/:id', getGameByIdHandler)

// POST /videogames
videogamesRouter.post('/', postGameHandler)

//DELETE /:idVideogame
videogamesRouter.delete('/:id', deleteGameHandler)

module.exports = videogamesRouter
