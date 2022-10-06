const express = require('express');
const app = express();
const user = require('./routes/user');
const todo = require('./routes/todo');

app.use(express.json());

app.use('/api', user);
app.use('/api', todo);

module.exports = app;
