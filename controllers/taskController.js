const Model = require(`../models`)
const createError = require(`../helpers/createErrors`)

class TaskController {
    static create(req, res, next) {
        var { title, category } = req.body

        var newTask = {
            title,
            category,
            UserId: req.user.id
        }

        Model.Task.create(newTask)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static read(req, res, next) {
        var UserId = req.user.id

        Model.Task.findAll({
            where: {
                UserId
            },
            order: [[`createdAt`, `ASC`]]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static update(req, res, next) {
        var { title, category } = req.body

        Model.Task.update({
            title,
            category
        }, {
            where: {
                id: Number(req.params.id)
            }
        })
            .then(data => {
                if (data) {
                    return Model.Task.findByPk(Number(req.params.id))
                } else {
                    throw createError(404, `Task ${req.params.id} does not exist`)
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Model.Task.findByPk(Number(req.params.id))
            .then(data => {
                if (data) {
                    Model.Task.destroy({
                        where: {
                            id: Number(req.params.id)
                        }
                    })

                    res.status(200).json(data)
                } else {
                    throw createError(404, `Task ${req.params.id} does not exist`)
                }
            })
            .catch(next)
    }
}

module.exports = TaskController