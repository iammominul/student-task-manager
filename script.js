// Student Task Manager - Lab 4
// Adds tasks, blocks empty input, marks tasks as completed, and updates the progress.

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const warning = document.getElementById("warning");
const doneCount = document.getElementById("done-count");
const totalCount = document.getElementById("total-count");
const progressFill = document.getElementById("progress-fill");
const pendingHint = document.getElementById("pending-hint");

// Show a warning message below the input
function showWarning(message) {
  warning.textContent = message;
  warning.hidden = false;
  taskInput.classList.add("input-error");
}

// Hide the warning message
function clearWarning() {
  warning.hidden = true;
  taskInput.classList.remove("input-error");
}

// Build one <li> for a task, with the same structure as the example tasks
function createTaskItem(taskText) {
  const item = document.createElement("li");

  const label = document.createElement("label");
  label.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "check";

  const body = document.createElement("span");
  body.className = "task-body";

  const name = document.createElement("span");
  name.className = "task-name";
  name.textContent = taskText;

  const meta = document.createElement("span");
  meta.className = "task-meta";
  meta.textContent = "Added today";

  const status = document.createElement("span");
  status.className = "status";
  status.textContent = "Pending";

  body.append(name, meta);
  label.append(checkbox, body);
  item.append(label, status);
  return item;
}

// Read the input, validate it, and add the task to the list
function addTask(event) {
  event.preventDefault(); // stop the form from reloading the page

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    showWarning("Please write a task before adding it.");
    taskInput.focus();
    return;
  }

  clearWarning();
  taskList.appendChild(createTaskItem(taskText));
  taskInput.value = "";
  taskInput.focus();
  updateProgress();
}

// Mark a task as completed or pending
function setCompleted(item, isCompleted) {
  item.classList.toggle("completed", isCompleted);
  item.querySelector(".status").textContent = isCompleted ? "Completed" : "Pending";
}

// Count the tasks and update the progress text and bar
function updateProgress() {
  const total = taskList.children.length;
  const done = taskList.querySelectorAll(".completed").length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  doneCount.textContent = done;
  totalCount.textContent = total;
  progressFill.style.width = percent + "%";
  pendingHint.textContent = (total - done) + " pending";
}

// Event listeners
taskForm.addEventListener("submit", addTask); // Add Task button or Enter key

// Hide the warning as soon as the user starts typing
taskInput.addEventListener("input", function () {
  if (taskInput.value.trim() !== "") {
    clearWarning();
  }
});

// One listener on the list handles the checkbox of every task (event delegation)
taskList.addEventListener("change", function (event) {
  if (event.target.classList.contains("check")) {
    setCompleted(event.target.closest("li"), event.target.checked);
    updateProgress();
  }
});

updateProgress();
