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

function Addeditems() {
  if (input.value === "") {
    alert("Input cannot be Empty");
  } else {
    const content = `
        <div class="listcontainer list1">
        <div class="listImgAndValueContainer">
            <img class="listimg" src="./Assets/Check.svg">
        <h1>${input.value}</h1>
        </div>
        <img class="deletesvg" src="./Assets/Delete.svg">
      </div>`;
    const newItem = document.createElement("div");
    newItem.innerHTML = content;
    tasks.push(input.value);

    listContainer.insertBefore(newItem, footer);

    const imgElement = newItem.querySelector(".listimg");
    let isChecked = false;

    const Deleteoption = newItem.querySelector(".deletesvg");

    imgElement.addEventListener("click", () => {
      if ((isChecked = !isChecked)) {
        imgElement.src = isChecked
          ? "./Assets/Checked.svg"
          : "./Assets/Check.svg";
        newItem.style.textDecorationLine = "line-through";
      } else {
        imgElement.src = isChecked
          ? "./Assets/Check.svg"
          : "./Assets/Check.svg";
        newItem.style.textDecorationLine = "none";
      }
    });

    Deleteoption.addEventListener("click", () => {
      if (newItem.style.textDecorationLine !== "line-through") {
        alert("Undone list cannot be deleted");
      } else {
        newItem.remove();
      }
    });
    input.value = "";
  }
}
