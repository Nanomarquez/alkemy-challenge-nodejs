const {Movie,Character} = require('../db.js') 

module.exports = class charactersServices {
    async getAllCharacters(query) {
        return await Character.findAll({
            where: query,
            attributes: ['id', 'picture', 'name']
        })
    }

    async getCharacterById(id) {
        return await Character.findByPk(id, {
            include: {
                model: Movie,
                as: 'movies',
                through: {
                    attributes: []
                }
            }
        })
    }

    async createCharacter(object) {
        const newCharacter = Character.build(object)
        return await newCharacter.save()
    }

    async editCharacterById(id, object) {
        const editedCharacter = await Character.findByPk(id)
        editedCharacter.set(object)
        return await editedCharacter.save()
    }

    async deleteCharacterById(id) {
        try {
            const deletedCharacter = await Character.findByPk(id)
            await deletedCharacter.destroy()
            return true
        } catch {
            return false
        }
    }
}

