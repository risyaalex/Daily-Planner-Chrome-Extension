
let userTaskInput = document.getElementById("taskInput");
let userAddTaskButton = document.getElementById("addTaskButton");
let userTaskList = document.getElementById("taskList");

let taskArray = getTasksFromLocalStorage();

function getTasksFromLocalStorage() {
    
    let tasksStorageArray = localStorage.getItem("tasks") || [];

    // if (tasksStorageArray!= 0) {
    //     tasksStorageArray = JSON.parse(tasksStorageArray);
    //     console.log("Yes")
    // } else {
    //     console.log("No")
    // }

    return tasksStorageArray;
    
}

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

    taskList.innerHTML = ""

    for (let i = 0; i < taskArray.length; i++) {
        let taskElement = createTaskElement(taskArray[i]);
        taskList.appendChild(taskElement);
    }
}