const { Router } = require("express");
const {authMiddleware} = require('../middleware/auth.middleware')
const {
  createMovie,
  deleteMovie,
  editMovie,
  getAllMovies,
  getMovie
} = require('../controllers/movie.controllers')

const router = Router();

router.get('/',authMiddleware,getAllMovies)

router.get('/:id',authMiddleware,getMovie)

router.post('/',authMiddleware,createMovie)

router.put('/',authMiddleware,editMovie)

router.delete('/',authMiddleware,deleteMovie)

module.exports = router;