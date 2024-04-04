// save tasks to localStorage
function saveToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// read tasks from localStorage
function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000);
  const nextId = `task_${timestamp}_${randomNum}`;
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  
  const tasks = readTasksFromStorage();

  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  tasks.forEach((task) => {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  });

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}


// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  // Grab references to DOM elements
  const taskTitleInput = $('#task-title-input');
  const taskDescriptionInput = $('#task-description-input');
  const taskDueDateInput = $('#task-due-date');

  const taskTitle = taskTitleInput.val().trim();
  const taskDescription = taskDescriptionInput.val();
  const taskDueDate = dayjs(taskDueDateInput.val()).format('MMM DD YYYY');

  const newTask = {
    id: generateTaskId(),
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
    status: 'to-do',
  };
  const tasks = readTasksFromStorage();
  tasks.push(newTask);

  saveToLocalStorage(tasks);

  renderTaskList();

  // clears the input fields
  taskTitleInput.val('');
  taskDescriptionInput.val('');
  taskDueDateInput.val('');
}



// Todo: create a function to handle deleting a task
function handleDeleteTask() {
  const taskId = $(this).attr('data-task-id');
  const tasks = readTasksFromStorage();

  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1)
    }
  });

  saveToLocalStorage(tasks);

  renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const tasks = readTasksFromStorage();
  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;

  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  });
  saveToLocalStorage(tasks);
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

// when you click the "Save Changes" button, run handleAddTask function to push that information into the tasks array
const saveChangesBtn = $('#save-changes');
saveChangesBtn.on('click', handleAddTask);

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

});