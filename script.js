const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const listSelect = document.getElementById("list-select");
const deadlineInput = document.getElementById("deadline");
const taskListsDiv = document.getElementById("task-lists");

let tasks = [];

// Render Tasks
function renderTasks() {
  taskListsDiv.innerHTML = "";

  const lists = [...new Set(tasks.map(task => task.list))];

  lists.forEach(listName => {
    const listDiv = document.createElement("div");
    listDiv.classList.add("task-list");

    const heading = document.createElement("h2");
    heading.textContent = listName;
    listDiv.appendChild(heading);

    tasks
      .filter(task => task.list === listName)
      .forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        if (task.completed) taskDiv.classList.add("completed");

        const taskInfo = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = task.title;
        taskInfo.appendChild(title);

        if (task.deadline) {
          const deadline = document.createElement("p");
          deadline.textContent = "⏰ " + new Date(task.deadline).toLocaleString();
          deadline.style.fontSize = "12px";
          deadline.style.color = "gray";
          taskInfo.appendChild(deadline);
        }

        taskDiv.appendChild(taskInfo);

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        // Done Button
        const doneBtn = document.createElement("button");
        doneBtn.textContent = task.completed ? "Undo" : "Done";
        doneBtn.classList.add("done");
        doneBtn.onclick = () => {
          task.completed = !task.completed;
          renderTasks();
        };
        actions.appendChild(doneBtn);

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");
        editBtn.onclick = () => {
          const newTitle = prompt("Edit task:", task.title);
          if (newTitle) task.title = newTitle;
          const newDeadline = prompt("Edit deadline (YYYY-MM-DD HH:MM):", task.deadline);
          if (newDeadline) task.deadline = newDeadline;
          renderTasks();
        };
        actions.appendChild(editBtn);

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        deleteBtn.onclick = () => {
          tasks = tasks.filter(t => t.id !== task.id);
          renderTasks();
        };
        actions.appendChild(deleteBtn);

        taskDiv.appendChild(actions);
        listDiv.appendChild(taskDiv);
      });

    taskListsDiv.appendChild(listDiv);
  });
}

// Handle Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = {
    id: Date.now(),
    title: taskInput.value,
    list: listSelect.value,
    deadline: deadlineInput.value,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();

  form.reset();
});
