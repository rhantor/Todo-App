const ulLIst = document.querySelector(".list-item");
const form = document.querySelector(".input-section")
const inputV = document.querySelector(".input1");
const todoBtn = document.querySelector(".btn1");

const todos = JSON.parse(localStorage.getItem("todos"));

todoBtn.addEventListener("click", addTodo);

function addTodo(event) {
  event.preventDefault();
  let todoText = inputV.value;
  if (todoText == "" || inputV.value.trim() == "") {
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

    // Event Listener

    checkBtn.addEventListener("click", function (x) {
      const mark = x.target;
      if (mark.classList[0] === "check-btn") {
        const markEl = mark.parentElement;
        markEl.classList.toggle("checked");
      }
      store();
    });
    // trash btn

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("trash");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todo.appendChild(deleteBtn);

     // Event Listener

    deleteBtn.addEventListener("click", function (e) {
      const item = e.target;
      if (item.classList[0] === "trash") {
        const todoItem = item.parentElement;
        todoItem.classList.add("fall");
        todoItem.addEventListener("transitionend", function () {
          todoItem.remove();
        });
      }
    });

    // all clear btn


  }
  inputV.value = "";
}

function store() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];
  todosEl.forEach((todo) => {
      todos.push(todo.value);
      console.log(todo);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  
}
