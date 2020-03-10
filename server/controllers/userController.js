const Model = require(`../models`)
const jwt = require(`../helpers/jwt`)
const bcrypt = require(`../helpers/bcrypt`)
const createError = require(`../helpers/createErrors`)

class UserController {
    static register(req, res, next) {
        var { email, password } = req.body

        var newUser = {
            email,
            password
        }

        Model.User.create(newUser)
            .then(data => {
                var token = jwt.jwtSign(data.id)

                res.status(201).json({
                    token
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        var { email, password } = req.body

        Model.User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if (data) {
                    if (bcrypt.compare(password, data.password)) {
                        var token = jwt.jwtSign(data.id)
                        res.status(200).json({
                            token
                        })
                    } else {
                        throw   createError(400, `Wrong Email/Password`)
                    }
                } else {
                    throw   createError(400, `Wrong Email/Password`)
                }
            })
            .catch(next)
    }
}

module.exports = UserController