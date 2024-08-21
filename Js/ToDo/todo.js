const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  let todos = [];
  
  function displayTodos() {
    console.log("\nYour To-Do List:");
    if (todos.length === 0) {
      console.log("No tasks yet! Add some!");
    } else 
      todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
      });
    }
  
  function addTodo() {
    readline.question("Enter your task: ", (task) => {
      todos.push(task);
      console.log("Task added!");
      displayTodos();
      askForAction();
    });
  }
  
  function removeTodo() {
    displayTodos();
    readline.question("Enter the number of the task to remove: ", (index) => {
      const taskIndex = parseInt(index) - 1;
      if (taskIndex >= 0 && taskIndex < todos.length) {
        todos.splice(taskIndex, 1);
        console.log("Task removed!");
      } else {
        console.log("Invalid task number!");
      }
      displayTodos();
      askForAction();
    });
  }
  
  function askForAction() {
    readline.question("\nWhat do you want to do? (add, remove, list, quit): ", (action) => {
      switch (action.toLowerCase()) {
        case "add":
          addTodo();
          break;
        case "remove":
          removeTodo();
          break;
        case "list":
          displayTodos();
          askForAction();
          break;
        case "quit":
          console.log("Goodbye!");
          readline.close();
          break;
        default:
          console.log("Invalid action. Please try again.");
          askForAction();
      }
    });
  }
  
  console.log("Welcome to your simple To-Do List!");
  askForAction();