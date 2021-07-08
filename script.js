const ulLIst = document.querySelector(".list-item");
const form = document.querySelector(".input-section")
const inputV = document.querySelector(".input1");
const todoBtn = document.querySelector(".btn1");
const exitingData = JSON.parse(localStorage.getItem("todos"));

// Render Existing Lists
if(exitingData) {
  exitingData.map((item) => {
    addTodo(item);
  })
}

// Add todo on the list and save to localStorage
todoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addTodo();
});


function addTodo(existingValue) {
  const todoText = existingValue || inputV.value;

  if (todoText.trim() == "") {
    alert("type something");
  } else {
    // create DIV
    const todo = document.createElement("div");
    todo.classList.add("todo");
    ulLIst.appendChild(todo);
    // create LI
    const list = document.createElement("li");
    list.innerHTML = todoText;
    todo.appendChild(list);
  
    // check button
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    todo.appendChild(checkBtn);

    // trash btn
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("trash");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todo.appendChild(deleteBtn);

    // Event Listener
    checkBtn.addEventListener("click", function (x) {
      const mark = x.target;
      if (mark.classList[0] === "check-btn") {
        const markEl = mark.parentElement;
        markEl.classList.toggle("checked");
      }
      const todoWrapper = mark.parentElement;
      const data = todoWrapper.querySelector('li');
      store(data.innerHTML);
    });
  
     // Event Listener
    deleteBtn.addEventListener("click", function (e) {
      const item = e.target;
      if (item.classList[0] === "trash") {
        const todoItem = item.parentElement;
        todoItem.classList.add("fall");
        const todoWrapper = item.parentElement;
          const data = todoWrapper.querySelector('li');
        todoItem.addEventListener("transitionend", remove(data.innerHTML));
        ;
      }
    });
  }
  inputV.value = "";
}

// Store Data on localStorage
function store(data) {
  const todos = JSON.parse( localStorage.getItem('todos') ) || [];
  if(todos.includes(data)) {
    return false;
  }
  todos.push(data);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove Data from localStorage
function remove(data) {
  const exitingData = JSON.parse(localStorage.getItem('todos'));
  const todos = exitingData.filter( item => item !== data);

  if(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
}
