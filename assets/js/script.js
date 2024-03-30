// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// BS modal script
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })



// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (nextId === null || nextId === undefined) {
    //initalize nextId as 1
    nextId = 1;
  } else {
    //increment nextId by 1
    nextId++
  }
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const todoCards = $('#todo-cards');

let card = $('<div>').addClass('card bg-primary');
let cardHeader = $('<div>').addClass('card-header').text(task.title);
let cardBody = $('<div>').addClass('card-body');
let cardTextOne = $('<p>')


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}
const saveChanges = $('#save-changes');

saveChanges.on('click', function () {
  handleAddTask()

})

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // event.preventDefault();


  let taskTitle = $('#task-title');
  let taskTitleInput = taskTitle.val();
  let dueDate = $('#date');
  let dueDateInput = dueDate.val();
  let taskDescription = $('#task-description');
  let taskDescriptionInput = taskDescription.val();

  let task = {
    title: taskTitleInput,
    date: dueDateInput,
    description: taskDescriptionInput
  };

  console.log(task);
  createTaskCard(task);
  // clears the input fields
  taskTitle.val('');
  dueDate.val('');
  taskDescription.val('');
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});