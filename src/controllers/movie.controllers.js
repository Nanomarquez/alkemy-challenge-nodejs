const moviesServices = require('../services/moviesServices.js'
) 
const db = new moviesServices()

async function getAllMovies(req, res) {
    return res.status(200).json(await db.getAllMovies(req.query))
}

async function getMovie(req, res) {
    return res.status(200).json(await db.getMovieById(req.params.id))
}

async function createMovie(req, res) {
    const { picture, title, calification } = req.body
    try {
        const newMovie = await db.createMovie({ picture, title, calification })
        return res.status(201).json(newMovie)
    } catch (error) {
        return res.status(400).json({ error: error.errors[0].message })
    }
}

async function editMovie(req, res) {
    const { picture, title, calification } = req.body
    try {
        const editedMovie = await db.editMovieById(req.params.id, {
            picture,
            title,
            calification
        })
        return res.status(200).json(editedMovie)
    } catch (error) {
        return res.status(400).json({ error: error.errors[0].message })
    }
}

async function deleteMovie(req, res) {
    if (await db.deleteMovieById(req.params.id)) {
        return res.status(200).json({ message: 'movie deleted' })
    } else {
        return res.status(400).json({ message: 'movie could not be deleted' })
    }
}

module.exports ={
  getAllMovies,
  getMovie,
  createMovie,
  editMovie,
  deleteMovie
}