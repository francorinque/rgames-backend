const cleanObject = obj => {
	return {
		id: obj.id,
		name: obj.name,
		description: obj.description || 'No hay descripcion',
		platforms: obj.platforms?.map(platform => {
			return {
				id: platform.platform.id,
				name: platform.platform.name,
			}
		}),
		image: obj.background_image,
		rating: obj.rating,
		release_date: obj.released,
		genres: obj.genres?.map(genre => ({
			id: genre.id,
			name: genre.name,
		})),
	}
}

module.exports = cleanObject
