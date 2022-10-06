const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, 'Please provide a todo']
  },
  userid: {
    type: String
  }
});

const Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo;