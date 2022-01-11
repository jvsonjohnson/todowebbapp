//------------------------------------------SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todos");
const clearAll = document.querySelector(".clear-btn");

//------------------------------------------EVENT LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos); //DO THIS WHENEVER PAGE REFRESHES
clearAll.addEventListener("click", clearAllTodos);

//--------------------------------------------FUNCTIONS
function addTodo(event) {
  event.preventDefault();
  //create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  //create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  //save to local storage
  saveLocalTodos(todoInput.value);
  //create completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>'; // add html value
  completedButton.classList.add("complete-btn");
  //create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // add html value
  trashButton.classList.add("trash-btn");
  // Add todo item and buttons to todoDiv
  todoDiv.appendChild(newTodo);
  todoDiv.appendChild(completedButton);
  todoDiv.appendChild(trashButton);
  //append to tododiv with list to ul
  todoList.appendChild(todoDiv);

  todoInput.value = ""; //clear input value
}

function deleteCheck(event) {
  const item = event.target;
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todoitem = item.parentElement;
    // Animation
    todoitem.classList.add("fall");
    //remove from local storage
    removeLocalTodos(todoitem);
    todoitem.addEventListener("transitionend", function () {
      //transition end waits till transition is complete then runs function
      todoitem.remove();
    });
  }
  //CHECK MARK
  else if (item.classList[0] === "complete-btn") {
    const todoitem = item.parentElement;
    todoitem.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes; //node items
  todos.forEach(function (todo) {
    switch (event.target.value) {
      //case is using the value of select
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          // check if it contains that class
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//save to local storage...implement this in addTodo Function
function saveLocalTodos(todo) {
  // check if user already has any todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//display local storage items
function getLocalTodos() {
  // check if user already has any todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //loop over them
  todos.forEach(function (todo) {
    //create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    //create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    //create completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // add html value
    completedButton.classList.add("complete-btn");
    //create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // add html value
    trashButton.classList.add("trash-btn");
    // Add todo item and buttons to todoDiv
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
    //append to tododiv with list to ul
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // check if user already has any todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // console.log(todo.children[0].innerText);
  // console.log(todos.indexOf(todo.children[0].innerText));
  const todoTextValue = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoTextValue), 1); //splice removes index
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAllTodos() {
  localStorage.clear();
  window.location.reload(); // to reload page after the clear
}
