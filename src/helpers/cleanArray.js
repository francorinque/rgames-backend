const cleanArray = arr =>
	arr.map(elem => {
		return {
			id: elem.id,
			name: elem.name,
			image: elem.background_image,
			rating: elem.rating,
			genres: elem.genres?.map(genre => ({
				id: genre.id,
				name: genre.name,
			})),
			created: false,
		}
	})

module.exports = cleanArray
