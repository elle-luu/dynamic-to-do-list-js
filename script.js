document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks array OR create new one
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // REQUIRED: loadTasks function
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Modified addTask, but NOTHING removed from your original functionality
    function addTask(taskText = null, save = true) {

        const taskTextFinal = taskText !== null ? taskText : taskInput.value.trim();

        if (taskTextFinal === "") {
            if (taskText === null) alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskTextFinal;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // REQUIRED BY TEST

        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Remove from tasks array
            const index = tasks.indexOf(taskTextFinal);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage ONLY if save === true
        if (save) {
            tasks.push(taskTextFinal);
            saveTasks();
        }

        if (taskText === null) taskInput.value = "";
    }

    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // REQUIRED: call loadTasks() on page load
    loadTasks();
});

