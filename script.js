document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    function addTask(taskText = null, save = true) {
        const taskTextFinal = taskText !== null ? taskText : taskInput.value.trim();

        if (taskTextFinal === "") {
            if (taskText === null) alert("Please enter a task.");
            return;
        }

        createTaskElement(taskTextFinal);

        if (save) {
            tasks.push(taskTextFinal);
            saveTasks();
        }

        if (taskText === null) taskInput.value = "";
    }

    function loadTasks() {
        tasks.forEach(text => addTask(text, false));
    }

    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});

