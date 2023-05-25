const router = require('express').Router()

const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const todoController = require('../controllers/TodoController')

router.get('/', verifyToken, todoController.getAllTodo)
router.get('/question/search', verifyToken, todoController.searchTodo)
router.get('/done', verifyToken,todoController.getAllTodoDone)
router.get('/question/level',verifyToken,todoController.getAllTodoLevel)
router.post('/', verifyToken, todoController.createTodo)
router.put('/:id', verifyToken, todoController.updateTodo)
router.delete('/:id', verifyToken, todoController.deleteTodo)
router.put('/:id/toggle', verifyToken, todoController.toggleTodo)

module.exports = router
