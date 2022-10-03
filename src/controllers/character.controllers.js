const charactersServices = require('../services/charactersServices.js') 

const db = new charactersServices()

async function getAllCharacters(req, res) {
    return res.status(200).json(await db.getAllCharacters(req.query))
}

async function getCharacter(req, res) {
    return res.status(200).json(await db.getCharacterById(req.params.id))
}

async function createCharacter(req, res) {
    const { picture, name, age, weight, history } = req.body
    try {
        const newCharacter = await db.createCharacter({
            picture,
            name,
            age,
            weight,
            history
        })
        return res.status(201).json(newCharacter)
    } catch (error) {
        return res.status(400).json({ error: error.errors[0].message })
    }
}

async function editCharacter(req, res) {
    const { picture, name, age, weigth, history } = req.body
    try {
        const editedCharacter = await db.editCharacterById(req.params.id, {
            picture,
            name,
            age,
            weigth,
            history
        })
        return res.status(200).json(editedCharacter)
    } catch (error) {
        return res.status(400).json({ error: error.errors[0].message })
    }
}

async function deleteCharacter(req, res) {
    if (await db.deleteCharacterById(req.params.id)) {
        return res.status(200).json({ message: 'character deleted' })
    } else {
        return res
            .status(400)
            .json({ message: 'character could not be deleted' })
    }
}

module.exports = {
  getAllCharacters,
  getCharacter,
  createCharacter,
  editCharacter,
  deleteCharacter
}