const express = require('express')
const router = express.Router()
const user = require(`./userRouter`)
const task = require(`./taskRouter`)
const authen = require(`../middleware/authentication`)

router.get(`/`, (req, res) => {
    res.json({
        message: `hello world`
    })
})

router.use(`/users`, user)

router.use(authen)

router.use(`/tasks`, task)

module.exports = router