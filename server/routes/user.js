const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.view)
router.post('/', userController.find)

router.get('/add-user', userController.form)
router.post('/add-user', userController.create)
router.get('/edit-user/:id', userController.edit)
router.post('/edit-user/:id', userController.update)
router.get('/view-user/:id', userController.viewall)
router.get('/:id', userController.delete)
module.exports = router

