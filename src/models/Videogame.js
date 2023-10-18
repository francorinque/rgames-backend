const { DataTypes } = require('sequelize')
const capitalizeFirstLetter = require('../helpers/capitalizeFirstLetter')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	// defino el modelo
	sequelize.define(
		'Videogame',
		{
			id: {
				type: DataTypes.UUID, //  dato hexadecimal
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			platforms: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			release_date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			rating: {
				type: DataTypes.DECIMAL,
				validate: {
					max: 10,
					min: 0,
				},
				allowNull: false,
			},
			created: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			hooks: {
				beforeCreate: videogame => {
					videogame.name = capitalizeFirstLetter(videogame.name)
				},
			},
		}
	)
}
