import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-name");

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");

  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "×";

  deleteButton.addEventListener("click", () => {
    deleteTask(task.id);
    item.remove();
  });
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    console.log(tasks);
    saveTasks();
  });

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title, deleteButton);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function deleteTask(taskId: string) {
  tasks.splice(
    tasks.findIndex((task) => task.id === taskId),
    1
  );
  saveTasks();
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
