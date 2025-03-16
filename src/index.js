document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const prioritySelect = document.getElementById("priority");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const taskInput = document.getElementById("new-task-description");
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === "") return; // Ignore empty input

    // Create task object
    const task = {
      text: taskText,
      priority: priority
    };

    addTaskToDOM(task);

    // Clear input field
    taskInput.value = "";
  });

  function addTaskToDOM(task) {
    const newTask = document.createElement("li");
    newTask.textContent = task.text;

    // Apply color based on priority
    if (task.priority === "high") {
      newTask.style.color = "red";
    } else if (task.priority === "medium") {
      newTask.style.color = "orange";
    } else {
      newTask.style.color = "green";
    }

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", function () {
      newTask.remove();
    });

    // Add Edit Feature (Double-click to edit)
    newTask.addEventListener("dblclick", function () {
      const newText = prompt("Edit Task:", newTask.textContent);
      if (newText) {
        newTask.textContent = newText;
        newTask.appendChild(deleteBtn);
      }
    });

    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);

    // Sort tasks after adding
    sortTasks();
  }

  function sortTasks() {
    const tasksArray = Array.from(taskList.children);

    tasksArray.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      const aPriority = priorityOrder[getPriority(a)];
      const bPriority = priorityOrder[getPriority(b)];
      return aPriority - bPriority;
    });

    taskList.innerHTML = "";
    tasksArray.forEach(task => taskList.appendChild(task));
  }

  function getPriority(taskElement) {
    if (taskElement.style.color === "red") return "high";
    if (taskElement.style.color === "orange") return "medium";
    return "low";
  }
});
