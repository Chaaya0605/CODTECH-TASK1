const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskTracker = document.getElementById("task-tracker");
const taskTrackerCircle = document.getElementById("task-tracker-circle");
const taskTrackerText = document.getElementById("task-tracker-text");
const goalInput = document.getElementById("goal-input");
const setGoalBtn = document.getElementById("set-goal-btn");
// const darkModeBtn = document.getElementById("dark-mode-btn");

let tasks = [];
let completedTasks = 0;
let goal = 0;
// let darkMode = false;

function AddTask(){
    if(inputBox.value === '')
    {
        alert("Please write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        tasks.push(li);
    }

    inputBox.value = "";
    saveData();
    updateTracker();
}

inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        AddTask();
    }
}); 

document.getElementById('set-goal-btn').addEventListener('click', () => {
    goal = parseInt(document.getElementById('goal-input').value);
    document.getElementById('task-tracker').innerText = `${taskCount}/${goal}`;
    animateTrackerCircle();
});

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        if(e.target.classList.contains("checked")){
            completedTasks++;
            taskTrackerCircle.classList.add("completed"); /* add completed class */
            setTimeout(() => {
                taskTrackerCircle.classList.remove("completed"); /* remove completed class after animation */
            }, 500);
        } else {
            completedTasks--;
        }
        saveData();
        updateTracker();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        tasks = tasks.filter(task => task!== e.target.parentElement);
        saveData();
        updateTracker();
    }
},false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function displayListofTasks(){
    listContainer.innerHTML = localStorage.getItem("data");
    tasks = Array.from(listContainer.children);
    completedTasks = tasks.filter(task => task.classList.contains("checked")).length;
    updateTracker();
}

function updateTracker(){
    taskTracker.textContent = `${completedTasks}/${tasks.length}`;
    animateTrackerCircle();
}

function showAllTasks(){
    listContainer.innerHTML = localStorage.getItem("data");
    tasks = Array.from(listContainer.children);
    completedTasks = tasks.filter(task => task.classList.contains("checked")).length;
    updateTracker();
}

function showCompletedTasks(){
    let completedTasksHTML = tasks.filter(task => task.classList.contains("checked")).map(task => task.outerHTML).join("");
    listContainer.innerHTML = completedTasksHTML;
    tasks = Array.from(listContainer.children);
    completedTasks = tasks.length;
    updateTracker();
}

function showIncompleteTasks(){
    let incompleteTasksHTML = tasks.filter(task => !task.classList.contains("checked")).map(task => task.outerHTML).join("");
    listContainer.innerHTML = incompleteTasksHTML;
    tasks = Array.from(listContainer.children);
    completedTasks = 0;
    updateTracker();
}

function deleteAllTasks(){
    localStorage.removeItem("data");
    listContainer.innerHTML = "";
    tasks = [];
    completedTasks = 0;
    updateTracker();
}

function animateTrackerCircle() {
    taskTrackerCircle.style.transform = "scale(1.2)";
    setTimeout(() => {
        taskTrackerCircle.style.transform = "scale(1)";
    }, 500);
}

displayListofTasks();


taskTrackerCircle.style.transition = "transform 0.5s ease-in-out";
taskTrackerCircle.style.animation = "task-complete 0.5s ease-in-out";