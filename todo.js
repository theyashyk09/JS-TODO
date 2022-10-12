const userTask = document.getElementById("topInput");
const addButton = document.getElementById("add");
const todoList = document.getElementById("tasks");
window.addEventListener("load", getTodoList);

function setTodoList() {
  addButton.addEventListener("click", () => {
    const todoItems = localStorage.getItem("todos");
    if (todoItems == null) {
      todos = [];
    } else {
      todos = JSON.parse(todoItems);
    }

    let todoContent = new Object();
    todoContent.todo = userTask.value.trim();
    todos.push(todoContent);
    localStorage.setItem("todos", JSON.stringify(todos));
    userTask.value = "";
    getTodoList();
  });
}

setTodoList();

function getTodoList() {
  const todoItems = localStorage.getItem("todos");
  if (todoItems == null) {
    todoList.textContent = "No Pending Tasks";
  } else {
    const todoArr = JSON.parse(todoItems);
    todoList.textContent = "";
    todoArr.forEach((element, index) => {
      if (element.todo.trim() == "") {
        return;
      } else {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("inputCb");

        let taskP = document.createElement("input");
        taskP.type = "text";
        taskP.classList.add("added-task");
        taskP.id = "user-task-input";
        taskP.readOnly = true;

        let edit = document.createElement("span");
        let del = document.createElement("span");
        edit.classList.add("edit");
        del.classList.add("del");
        edit.id = index;
        del.id = index;

        edit.textContent = "✏️";
        del.textContent = "🗑️";

        taskDiv.appendChild(checkBox);
        taskDiv.appendChild(taskP);
        taskDiv.appendChild(edit);
        taskDiv.appendChild(del);

        todoList.appendChild(taskDiv);

        taskP.value = element.todo.trim();

        checkBox.addEventListener("click", () => {
          if (checkBox.checked == true) {
            taskP.style.textDecoration = "line-through";
            taskP.style.color = "#adadad";
          } else {
            taskP.style.textDecoration = "none";
            taskP.style.color = "#d4daf2";
          }
        });

        del.addEventListener("click", () => {
          todoList.removeChild(taskDiv);
          removeTask(index);
        });

        edit.addEventListener("click", () => {
          if (taskP.readOnly == true) {
            taskP.readOnly = false;
            edit.textContent = "✔️";
          } else {
            taskP.readOnly = true;
            edit.textContent = "✏️";
            let editInputText = taskP.value;
            todoContent = localStorage.getItem("todos");
            todos = JSON.parse(todoContent);
            todos.splice(index, 1, {
              todo: editInputText,
            });
            localStorage.setItem("todos", JSON.stringify(todos));
            getTodoList();
          }
        });
      }
    });
  }
}

function removeTask(index) {
  todoContent = localStorage.getItem("todos");
  if (todoContent == null) {
    todos = [];
  } else {
    todos = JSON.parse(todoContent);
  }
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  if (todos.length == 0) {
    localStorage.clear();
  }
  getTodoList();
}

userTask.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("add").click();
  }
});
