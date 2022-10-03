const jwt = require('jsonwebtoken') 
const {User} = require('../db.js') 
const mailService = require('../services/mailService.js') 

async function authLogin(req, res) {
    const { username, password } = req.body
    if (!username | !password) {
        return res
            .status(400)
            .json({ error: 'username and password are mandatory' })
    }
    try {
        const userToValidate = await User.findOne({
            where: {
                username: username
            }
        })
        if (!userToValidate) {
            return res.status(404).json({ error: 'username has not be found' })
        }
        if (await userToValidate.comparePassword(password)) {
            const token = await generateToken({
                id: userToValidate.id,
                username: userToValidate.username
            })
            return res.status(200).json({
                message: 'successfully logged in',
                user: {
                    id: userToValidate.id,
                    username: userToValidate.username
                },
                token
            })
        } else {
            return res.status(401).json({ error: 'password is not correct' })
        }
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

async function authRegister(req, res) {
    const { username, password } = req.body
    if (!username | !password) {
        return res
            .status(400)
            .json({ error: 'username and password are mandatory' })
    }
    try {
        let user = {}
        try {
            user = await User.create({
                username,
                password
            })
        } catch (error) {
            return res.status(500).json({error:error.parent.detail})
        }

        let mail = new mailService(
            user.username,
            'Welcome',
            `Welcome ${user.username} to Alkemy API challenge`,
            `<h2>Welcome ${user.username} to Alkemy API challenge</h2>`
        )
        mail.sendMail().catch(err=>{
            console.log(err)
        })

        const token = await generateToken({
            id: user.id,
            username: user.username
        })
        return res.status(201).json({
            message: 'successfully registered',
            user: { id: user.id, username: user.username },
            token
        })
    } catch (error) {
        console.log(error)
    }
}

async function generateToken(object) {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            object,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
            (error, token) => {
                if (error) {
                    reject(error)
                }
                resolve(token)
            }
        )
    })
}

module.exports = {
  authLogin,
  authRegister
}