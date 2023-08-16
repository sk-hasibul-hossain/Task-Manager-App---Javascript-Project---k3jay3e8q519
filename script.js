//Modal code
const createTaskBtn = document.querySelector("#create-task-btn");
const modal = document.querySelector("#task-modal");
const closeModalBtn = document.querySelector("#close-model-btn");
const taskBody = document.querySelector("#task-body");
const addBtn = document.querySelector("#modal-task-btn");
const validInput = document.querySelector("#task-input-error");

closeModalBtn.addEventListener("click", (e) => {
  modal.style.display = "none";
  validInput.style.visibility = "hidden";
});

createTaskBtn.addEventListener("click", (e) => {
  modal.style.display = "block";
  console.log(e.target);
});

const taskTable = new Map();
let count = 0;
addBtn.addEventListener("click", () => {
  //Tasks are shown
  const taskStr = document.querySelector("#modal-task-input");
  const withoutSpaceStr = taskStr.value.split(" ").join("");
  if (withoutSpaceStr.length > 0) {
    count++;
    const taskProgress = document.createElement("div");
    taskProgress.setAttribute("class", "task-progress");
    taskProgress.setAttribute("id", `task-progress-${count}`);

    const taskDescription = document.createElement("p");
    taskDescription.setAttribute("class", "task-description");
    taskDescription.textContent = taskStr.value;

    const progress = document.createElement("div");
    progress.setAttribute("class", "progress");

    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    taskDiv.setAttribute("id", `open-task-${count}`);
    taskDiv.setAttribute("draggable", "true");
    taskDiv.setAttribute("ondragstart", "drag(event)");

    taskDiv.appendChild(taskProgress);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(progress);

    taskBody.prepend(taskDiv);

    validInput.style.visibility = "hidden";

    taskTable.set(`open-task-${count}`, [0, 0, 0]);
  } else {
    validInput.style.visibility = "visible";
  }
  taskStr.value = "";
});

//Drag drop code
const inprocessDragDropBodyHeight = document.querySelector(
  ".process-drag-drop-body-height"
);
const reviewDragDropBodyHeight = document.querySelector(
  ".review-drag-drop-body-height"
);
const doneDragDropBodyHeight = document.querySelector(
  ".done-drag-drop-body-height"
);
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const dataIdName = ev.dataTransfer.getData("text");
  const dataSelector = document.querySelector(`#${dataIdName}`);
  const taskValidateArr = taskTable.get(dataIdName);
  if (
    taskValidateArr[0] === 0 &&
    taskValidateArr[1] === 0 &&
    taskValidateArr[2] === 0 &&
    ev.target.id === "task-inprocess"
  ) {
    /*Data Manipulation*/
    console.log();
    document.querySelector(
      `#${dataIdName} > .task-progress`
    ).style.width = `${50}%`;
    /*Data Manipulation end*/
    ev.target.appendChild(dataSelector);

    let h = inprocessDragDropBodyHeight.offsetHeight;
    h += 100;
    inprocessDragDropBodyHeight.style.height = `${h}px`;

    taskTable.set(dataIdName, [1, 0, 0]);
  } else if (
    taskValidateArr[0] === 1 &&
    taskValidateArr[1] === 0 &&
    taskValidateArr[2] === 0 &&
    ev.target.id === "task-in-review"
  ) {
    /*Data Manipulation*/
    document.querySelector(
      `#${dataIdName} > .task-progress`
    ).style.width = `${75}%`;
    document.querySelector(
      `#${dataIdName} > .task-progress`
    ).style.backgroundColor = `#e009a0`;
    /*Data Manipulation end*/
    ev.target.appendChild(dataSelector);

    let h = reviewDragDropBodyHeight.offsetHeight;
    h += 100;
    reviewDragDropBodyHeight.style.height = `${h}px`;

    taskTable.set(dataIdName, [1, 1, 0]);
  } else if (
    taskValidateArr[0] === 1 &&
    taskValidateArr[1] === 1 &&
    taskValidateArr[2] === 0 &&
    ev.target.id === "task-in-done"
  ) {
    document.querySelector(
      `#${dataIdName} > .task-progress`
    ).style.width = `${100}%`;

    ev.target.appendChild(dataSelector);

    let h = doneDragDropBodyHeight.offsetHeight;
    h += 100;
    doneDragDropBodyHeight.style.height = `${h}px`;

    taskTable.set(dataIdName, [1, 1, 1]);
  }
}
