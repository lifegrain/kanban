const express = require('express')
const router = express.Router()
const { task } = require(`../controllers/index`)
const authorize = require(`../middleware/authorization`)

router.get(`/`, task.read)
router.post(`/`, task.create)
router.put(`/:id`, authorize, task.update)
router.delete(`/:id`, authorize, task.delete)

module.exports = router