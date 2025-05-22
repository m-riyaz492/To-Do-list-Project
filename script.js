const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");


// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
    updateStats();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
    updateStats();
}

// Add new task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    inputBox.value = "";
    saveTasks();
}

// Handle clicks on list items and delete button
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTasks();
    }
}, false);

// Filter tasks
function filterTasks(filterType) {
    const tasks = listContainer.getElementsByTagName("li");
    const filterButtons = document.querySelectorAll(".filters button");
    
    // Update active filter button
    filterButtons.forEach(button => {
        button.classList.remove("active");
        if (button.textContent.toLowerCase() === filterType) {
            button.classList.add("active");
        }
    });

    // Show/hide tasks based on filter
    for (let task of tasks) {
        switch(filterType) {
            case 'all':
                task.style.display = "block";
                break;
            case 'active':
                task.style.display = task.classList.contains("checked") ? "none" : "block";
                break;
            case 'completed':
                task.style.display = task.classList.contains("checked") ? "block" : "none";
                break;
        }
    }
}

// Update statistics
function updateStats() {
    const tasks = listContainer.getElementsByTagName("li");
    const completed = listContainer.getElementsByClassName("checked");
    
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed.length;
}

// Enter key to add task
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Load tasks when page loads
loadTasks();