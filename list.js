const form = document.getElementById("add-task-form");
const input = document.getElementById("new-task-input");
const list = document.getElementById("task-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") return;
  const task = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = input.value.trim();
  task.appendChild(span);
  const button = document.createElement("button");
  button.textContent = "Delete";
  task.appendChild(button);
  list.appendChild(task);
  input.value = "";
  task.addEventListener("click", () => {
    task.classList.toggle("completed");
  });
  button.addEventListener("click", () => {
    list.removeChild(task);
  });
});