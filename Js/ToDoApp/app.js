const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let todos = []; 

app.get('/', (req, res) => {
  res.render('index', { todos: todos });
});

app.post('/add', (req, res) => {
    const newTodo = req.body.newTodo.trim();
  
    if (newTodo === "") {
      res.render('index', { todos: todos, error: 'Please enter a valid task.' });
    } else {
      todos.push(newTodo);
      res.redirect('/');
    }
  });

app.post('/remove/:index', (req, res) => {
  const indexToRemove = req.params.index;
  todos.splice(indexToRemove, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});