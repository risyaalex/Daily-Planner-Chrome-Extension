// Get DOM elements

let userTaskInput = document.getElementById("taskInput");
let userAddTaskButton = document.getElementById("addTaskButton");
let usershowTaskButton = document.getElementById("showTaskButton");
let userTaskList = document.getElementById("taskList");


// Get tasks from localStorage

let taskArray = getTasksFromLocalStorage();


// Function to get tasks from localStorage

function getTasksFromLocalStorage() {

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


// Update tasks in localStorage

function updateTasksInLocalStorage() {
    let updateTasks = JSON.stringify(taskArray);
    localStorage.setItem("tasks", updateTasks);
}


// Create a task object

function createTask(taskText) {
    return { text: taskText, completed: false};
}


// Delete a task

function deleteTask(index) {
    taskArray.splice(index, 1);
    updateTasksInLocalStorage();
}

// Create a DOM element for a task

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
        deleteTask(taskArray.indexOf(taskObj));
        renderTasks();
    });
  
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(removeButton);
  
    return taskItem;
}


// Render tasks in the list

function renderTasks() {

    userTaskList.innerHTML = ""

    for (let i = 0; i < taskArray.length; i++) {
        let taskElement = createTaskElement(taskArray[i]);
        userTaskList.appendChild(taskElement);
    }
}


// Add a task when "Add Task" button is clicked

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



// Display tasks in console when "Show All Tasks" button is clicked

usershowTaskButton.addEventListener("click", function () {
    if (taskArray !== 0) console.log(taskArray)
    renderTasks();
});