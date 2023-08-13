
let userTaskInput = document.getElementById("taskInput");
let userAddTaskButton = document.getElementById("addTaskButton");
let usershowTaskButton = document.getElementById("showTaskButton");
let userTaskList = document.getElementById("taskList");

let taskArray = getTasksFromLocalStorage();

function getTasksFromLocalStorage() {
    
    // return localStorage.getItem("tasks") || [];

    let storedTasks = localStorage.getItem("tasks");

    if (storedTasks == null) {
        console.log("No")
        return [];   
    } else {
        console.log("Yes")
        return JSON.parse(storedTasks);    
    }
}

console.log(taskArray)

function updateTasksInLocalStorage() {
    let updateTasks = JSON.stringify(taskArray);
    localStorage.setItem("tasks", updateTasks);

    // console.log(updateTasks);
}

function createTask(taskText) {
    return { text: taskText, completed: false};
}

function deleteTask(index) {
    taskArray.splice(index, 1);
    updateTasksInLocalStorage();
}

// 3.5 Implement the createTaskElement(taskObj) Function
function createTaskElement(taskObj) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = taskObj.completed;
    checkbox.addEventListener("change", function () {
        taskObj.completed = checkbox.checked;
        taskTextElement.classList.toggle("completed", taskObj.completed);
        updateTasksInLocalStorage();
    });
  
    const taskTextElement = document.createElement("span");
    taskTextElement.classList.add("taskText");
    taskTextElement.textContent = taskObj.text;
    taskTextElement.classList.toggle("completed", taskObj.completed);
  
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", function () {
        deleteTask(taskObj);
        renderTasks();
    });
  
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(removeButton);
  
    return taskItem;
}

function renderTasks() {

    userTaskList.innerHTML = ""

    for (let i = 0; i < taskArray.length; i++) {
        let taskElement = createTaskElement(taskArray[i]);
        userTaskList.appendChild(taskElement);
    }
}

userAddTaskButton.addEventListener("click", function() {
    const taskText = userTaskInput.value;

    if (taskText == "") {
        return;
    }

    const newTask = createTask(taskText);

    taskArray.push(newTask);

    updateTasksInLocalStorage()

    userTaskInput.value = ""

    renderTasks()
});

usershowTaskButton.addEventListener("click", function () {
    if (taskArray !== 0) console.log(taskArray)
    renderTasks();
});