const Todo = require('./../model/todoModel');

exports.createTodo = async (req, res, next) => {

  // Create a new Todo
  const newTodo = await Todo.create({
    todo: req.body.todo,
    userid: req.user._id
  });
  res.status(201).json({
    status: 'success',
    data: newTodo
  });
}

exports.getTodo = async (req, res, next) => {

  //Get all todos for the logged in user
  const todos = await Todo.find({ userid: req.user._id });
  res.status(201).json({
    status: 'success',
    data: todos
  })
}

exports.updateTodo = async (req, res, next) => {

  //Update the todo for the requested ID
  const todo = await Todo.findByIdAndUpdate({ _id: req.params.id },
    {
      $set: {
        todo: req.body.todo
      }
    },
    {
      new: true
    });

    if(!todo){
      res.status(404).json({
        status: 'fail',
        message: 'No todo found for requested ID'
      })
    }

  res.status(201).json({
    status: 'success',
    data: todo
  })

}

exports.deleteTodo = async (req, res, next) => {

  //Delete Todo fo the requested ID
  const todo = await Todo.findByIdAndDelete({
    _id: req.params.id
  });
  res.status(204).json({
    status: 'success'
  })
}