//Modal code
const createTaskBtn = document.querySelector("#create-task-btn");
const modal = document.querySelector("#task-modal");
const closeModalBtn = document.querySelector("#close-model-btn");
const taskBody = document.querySelector("#task-body");
const addBtn = document.querySelector("#modal-task-btn");
const validInput = document.querySelector("#task-input-error");

/* global state for distinct identify to add decription */
let descriptioState = "";

const modalHide = () => {
  modal.style.display = "none";
  validInput.style.visibility = "hidden";
  taskSaved.style.visibility = "hidden";
};
closeModalBtn.addEventListener("click", (e) => {
  modalHide();
});

const modalVisible = () => {
  modal.style.display = "block";
  descriptioState = "open";
};

createTaskBtn.addEventListener("click", (e) => {
  modalVisible();
});

const taskTable = new Map();
const taskStr = document.querySelector("#modal-task-input");
let count = 0;
addBtn.addEventListener("click", () => {
  //Tasks are shown

  if (descriptioState === "open") {
    const withoutSpaceStr = taskStr.value.split(" ").join("");
    if (withoutSpaceStr.length > 0) {
      count++;
      const taskProgress = document.createElement("div");
      taskProgress.setAttribute("class", "task-progress");
      taskProgress.setAttribute("id", `task-progress-${count}`);

      const taskDescription = document.createElement("p");
      taskDescription.setAttribute("class", "task-description");
      taskDescription.textContent = `OPEN: ${taskStr.value}`;

      const progress = document.createElement("div");
      progress.setAttribute("class", "progress");
      progress.setAttribute("id", "add-new-description");
      progress.setAttribute("onclick", "addSomethingFunction(event)");

      const taskDiv = document.createElement("div");
      taskDiv.setAttribute("class", "task");
      taskDiv.setAttribute("id", `open-task-${count}`);
      taskDiv.setAttribute("draggable", "true");
      taskDiv.setAttribute("ondragstart", "drag(event)");
      // taskDiv.setAttribute("onclick", "addSomethingFunction(id)");

      taskDiv.appendChild(taskProgress);
      taskDiv.appendChild(taskDescription);
      taskDiv.appendChild(progress);

      taskBody.prepend(taskDiv);

      validInput.style.visibility = "hidden";
      taskSaved.style.visibility = "visible";

      taskTable.set(`open-task-${count}`, [0, 0, 0]);
    } else {
      validInput.style.visibility = "visible";
    }
  }
  taskStr.value = "";
});
const taskSaved = document.querySelector(".task-input-saved");
taskStr.addEventListener("focusin", (e) => {
  taskSaved.style.visibility = "hidden";
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

let selectProcess = "";
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
    dataSelector.firstChild.style.width = `${50}%`;

    dataSelector.firstChild.classList.add("task-progress-color-blue");
    dataSelector.lastChild.classList.add("progress-color-blue");

    // selectProcess = document.querySelector(`#${dataIdName} > .progress`);
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
    dataSelector.firstChild.style.width = `${75}%`;
    dataSelector.firstChild.style.backgroundColor = `#e009a0`;
    dataSelector.removeChild(dataSelector.lastChild);

    const imgTag = document.createElement("img");
    imgTag.setAttribute("src", "./Notepad_icon.svg.png");
    imgTag.setAttribute("class", "edit-icon");
    imgTag.setAttribute("title", "Edit");
    imgTag.setAttribute("alt", "not loaded");
    imgTag.setAttribute("onclick", "addSomethingFunction(event)");
    dataSelector.appendChild(imgTag);

    // dataSelector.lastChild.classList.remove("progress-color-blue");
    // dataSelector.lastChild.classList.add("progress-color-purple");
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
    dataSelector.firstChild.style.width = `${95}%`;
    dataSelector.firstChild.style.backgroundColor = "rgb(5, 114, 5)";

    dataSelector.removeChild(dataSelector.lastChild);

    const li = document.createElement("i");
    li.setAttribute(
      "class",
      "fa-solid fa-check progress-checked progress-checked"
    );

    const progressDiv = document.createElement("div");
    progressDiv.setAttribute("class", "progress progress-color-green");
    // progressDiv.setAttribute("onclick", "addSomethingFunction(event)");
    // progressDiv.setAttribute("id", "add-new-description");

    progressDiv.appendChild(li);
    dataSelector.appendChild(progressDiv);

    ev.target.appendChild(dataSelector);

    let h = doneDragDropBodyHeight.offsetHeight;
    h += 100;
    doneDragDropBodyHeight.style.height = `${h}px`;

    taskTable.set(dataIdName, [1, 1, 1]);
  }
}

// function addSomethingFunction(targetIdName) {
//   const targetId = document.querySelector(`#${targetIdName}`);
//   if (
//     targetId.parentNode.parentNode.innerText.split(" ")[0].split("\n")[0] !==
//     "OPEN"
//   ) {
//     console.log("hi");
//     document.querySelector(`#${targetIdName}`).childNodes[2] = "abc";
//   }
// }

const updateCreateTaskBtn = document.querySelector("#update-create-task-btn");
const updateModal = document.querySelector("#update-task-modal");
const updateCloseModalBtn = document.querySelector("#update-close-model-btn");
const updateAddBtn = document.querySelector("#update-modal-task-btn");
const updateValidInput = document.querySelector("#update-task-input-error");

// updateCreateTaskBtn.addEventListener("click", (e) => {
//   modal.style.display = "block";
// });

let updateState = "";
const updateTaskFieldBtn = document.querySelector("#modal-task-btn");
const taskHeading = document.querySelector("#task-title");
function addSomethingFunction(event) {
  updateState = event.target.parentNode;
  // console.log(event.target.parentNode.parentNode.parentNode);
  const modelHeading = updateState.parentNode.parentNode.innerText.split(" ");
  if (modelHeading[0].split("\n")[0] !== "OPEN") {
    updateModal.style.display = "block";
    taskHeading.innerText = `${modelHeading[0]} ${
      modelHeading[1].split("\n")[0]
    }`;
  }
}
// const TaskState = updateState.target.parentNode.parentNode.parentNode.innerText
//   .split(" ")[0]
//   .split("\n")[0];

// if (TaskState != "OPEN") {

// }
const updateTaskSaved = document.querySelector(".update-task-input-saved");
const updateModalInput = document.querySelector("#update-modal-task-input");
updateAddBtn.addEventListener("click", () => {
  // console.log(updateState.firstChild.nextSibling);

  const withoutSpaceStr = updateModalInput.value.split(" ").join("");
  if (withoutSpaceStr.length > 0) {
    const targetElement = updateState.firstChild.nextSibling;
    const newP = document.createElement("p");
    const modelHeading = updateState.parentNode.parentNode.innerText.split(" ");
    // console.log(`${modelHeading[0]} ${modelHeading[1].split("\n")[0]}`);
    newP.textContent = `${modelHeading[0]} ${modelHeading[1].split("\n")[0]}: ${
      updateModalInput.value
    }`;
    targetElement.append(newP);
    // console.log(targetElement.parentNode.firstChild.nextSibling);
    updateValidInput.style.visibility = "hidden";
    updateTaskSaved.style.visibility = "visible";
  } else {
    updateValidInput.style.visibility = "visible";
  }
  updateModalInput.value = "";
});

updateModalInput.addEventListener("focusin", (e) => {
  updateTaskSaved.style.visibility = "hidden";
});

updateCloseModalBtn.addEventListener("click", (e) => {
  updateValidInput.style.visibility = "hidden";
  updateModal.style.display = "none";
  updateModalInput.value = "";
  updateTaskSaved.style.visibility = "hidden";
  // validInput.style.visibility = "hidden";
});

/* Re arrange drag and drop*/
const taskContainers = document.querySelectorAll(".task-container-body");

const handleRearrangeDropWithinColumn = (ev) => {
  ev.preventDefault();
  const sourceId = ev.dataTransfer.getData("text");
  const sourceElement = document.querySelector(`#${sourceId}`);
  const targetElement = ev.target.closest(".task");
  const parentContainer = sourceElement.parentNode;

  // Determine the new index for the source element
  const sourceIndex = Array.from(parentContainer.children).indexOf(
    sourceElement
  );
  const targetIndex = Array.from(parentContainer.children).indexOf(
    targetElement
  );

  // Reorder the tasks within the parent container
  if (sourceIndex > targetIndex) {
    parentContainer.insertBefore(sourceElement, targetElement);
  } else {
    parentContainer.insertBefore(
      sourceElement,
      targetElement.nextElementSibling
    );
  }
};

// Attach dragover and drop event listeners for rearranging tasks within columns
taskContainers.forEach((container) => {
  container.addEventListener("dragover", allowDrop);
  container.addEventListener("drop", handleRearrangeDropWithinColumn);
});

/* Delete drop */

function deleteDrop(ev) {
  ev.preventDefault();
  const dataIdName = ev.dataTransfer.getData("text");
  const taskValidateArr = taskTable.get(dataIdName);
  if (
    (taskValidateArr[0] === 0 &&
      taskValidateArr[1] === 0 &&
      taskValidateArr[2] === 0) ||
    (taskValidateArr[0] === 1 &&
      taskValidateArr[1] === 0 &&
      taskValidateArr[2] === 0) ||
    (taskValidateArr[0] === 1 &&
      taskValidateArr[1] === 1 &&
      taskValidateArr[2] === 0)
  ) {
    if (confirm("Do you really want to delete your profile?")) {
      document.querySelector(`#${dataIdName}`).remove();
    }
  }
  // console.log(dataIdName);
}

const deleteTitle = document.querySelector(".delete-title");
document
  .querySelector(".delete-conatiner")
  .addEventListener("mouseover", () => {
    deleteTitle.style.visibility = "visible";
  });
document
  .querySelector(".delete-conatiner")
  .addEventListener("pointerleave", () => {
    deleteTitle.style.visibility = "hidden";
  });
