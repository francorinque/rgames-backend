const server = require("./src/app.js")
const { getGenres } = require("./src/controllers/genresController.js")
const { conn } = require("./src/db.js")
require("dotenv").config()

const PORT = process.env.PORT || 3001

// Syncing all the models at once.
conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, async () => {
      // injecto los generos al iniciar el server
      await getGenres()
      console.log("base de datos llenada satisfactoriamente con genres")
      console.log("Server running on port:", PORT) // eslint-disable-line no-console
    })
  })
  .catch((error) => {
    console.error(error)
  })
