const express = require('express');
const todoController = require('./../controller/todoController');
const { protect } = require('./../controller/authController');

const router = express.Router();

router.get('/todos' ,protect ,todoController.getTodo);
router.post('/todo', protect, todoController.createTodo);
router.patch('/todo/:id', protect, todoController.updateTodo);
router.delete('/todo/:id', protect, todoController.deleteTodo);

module.exports = router;