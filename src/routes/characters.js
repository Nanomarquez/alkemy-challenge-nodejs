const { Router } = require("express");
const { authMiddleware } = require("../middleware/auth.middleware.js");
const {
  createCharacter,
  deleteCharacter,
  editCharacter,
  getAllCharacters,
  getCharacter,
} = require("../controllers/character.controllers.js");

const router = Router();

router.get('/',authMiddleware,getAllCharacters)

router.get('/:id',authMiddleware,getCharacter)

router.post('/',authMiddleware,createCharacter)

router.put('/:id',authMiddleware,editCharacter)

router.delete('/:id',authMiddleware,deleteCharacter)

module.exports = router;
