const input = document.querySelector("#todoInput");
const AddIcon = document.querySelector(".MobileSearch");
const listContainer = document.querySelector(".maincontainer");
const footer = document.querySelector("footer");

AddIcon.addEventListener("click", () => {
  Addeditems();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    Addeditems();
  }
});

let tasks = [];


window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task);
  });
});

function Addeditems() {
  if (input.value === "") {
    alert("Input cannot be Empty");
    return;
  }

  const task = input.value;
  createTaskElement(task);
  tasks.push(task);
  saveToLocalStorage();

  input.value = "";
}

function createTaskElement(task) {
  const content = `
    <div class="listcontainer list1">
      <div class="listImgAndValueContainer">
        <img class="listimg" src="./Assets/Check.svg">
        <h1>${task}</h1>
      </div>
      <img class="deletesvg" src="./Assets/Delete.svg">
    </div>`;

  const newItem = document.createElement("div");
  newItem.innerHTML = content;

  listContainer.insertBefore(newItem, footer);

  const imgElement = newItem.querySelector(".listimg");
  imgElement.addEventListener("click", () => toggleItemCompletion(newItem));

  const deleteOption = newItem.querySelector(".deletesvg");
  deleteOption.addEventListener("click", () => deleteItem(newItem, task));
}

function toggleItemCompletion(item) {
  const imgElement = item.querySelector(".listimg");
  const isChecked = imgElement.src.includes("Checked");

  imgElement.src = isChecked ? "./Assets/Check.svg" : "./Assets/Checked.svg";
  item.style.textDecorationLine = isChecked ? "none" : "line-through";

  saveToLocalStorage();
}

function deleteItem(item, task) {
  const isCompleted = item.style.textDecorationLine === "line-through";
  if (!isCompleted) {
    alert("Undone list cannot be deleted");
    return;
  }

  item.remove();

  const index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
