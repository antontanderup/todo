var todo = {
	tasks: [],
	taskLocalStorage: function(task) {
		if (task === "backup") {
			localStorage["tasks"] = JSON.stringify(todo.tasks);
		} else if (task === "reinitialize") {
			todo.tasks = JSON.parse(localStorage["tasks"]);
			todo.listTasks("all", false); todo.listTasks("all", true);
		}
	},
	initialise: function() {

	},
	listTask: function(id, task, ULid) {

		// Create li task element and add task text.
		var ul = document.getElementById(ULid), 
		li = document.createElement("li"), 
		taskContent = document.createTextNode(task);
		li.appendChild(taskContent);
		li.setAttribute("id", id);

		// Create span element and buttons to go inside.
		var span = document.createElement("span"),
		deleteButton = document.createElement("button"),
		doneButton = document.createElement("button"),
		doneButtonContent = "";
		deleteButton.appendChild(document.createTextNode("X"));
		deleteButton.setAttribute("title", "Delete task.");

		 // if task is not done
		if (ULid === "todo-list") {
			doneButtonContent = document.createTextNode("\u2713"); // Check mark.
			doneButton.appendChild(doneButtonContent);
			doneButton.setAttribute("title", "Complete task.");
		} else if (ULid === "history-list") { // Task is done
			doneButtonContent = document.createTextNode("\u00F7"); // Check mark.
			doneButton.appendChild(doneButtonContent);
			doneButton.setAttribute("title", "Task not yet completed.");
		}

		// Add buttons to span element
		span.appendChild(deleteButton); span.appendChild(doneButton);
	
		// Add span element to list
		li.appendChild(span);

		// Insert LI element in UL
		ul.insertBefore(li, ul.firstChild);

		// Add delete event-listener
		deleteButton.addEventListener("click", function() { todo.deleteTask(id); }, false); //

		if (ULid === "todo-list") {
			doneButton.addEventListener("click", function() { todo.doneTask(id); }, false);
		} else if (ULid === "history-list") {
			doneButton.addEventListener("click", function() { todo.undoneTask(id); }, false);
		}
	},
	listTasks: function(amount, done, taskID) { // List tasks
		if (amount === "all") {

			if (done === false) {
				for (var i = 0; i < todo.tasks.length; i++) {
					if (todo.tasks[i].done === false) {
						todo.listTask(todo.tasks[i].id, todo.tasks[i].task, "todo-list");
					}
				}
			} else if (done === true) {
				for (var x = 0; x < todo.tasks.length; x++) {
					if (todo.tasks[x].done === true) {
						todo.listTask(todo.tasks[x].id, todo.tasks[x].task, "history-list");
					}
				}

			}
		} else if (amount === "one") {
			for (var z = 0; z < todo.tasks.length; z++) {
				var task = todo.tasks[z]; 
				if (task.id === taskID  && done === false) {
					todo.listTask(task.id, task.task, "todo-list");
				} else if (task.id === taskID  && done === true) {
					todo.listTask(task.id, task.task, "history-list");
				}
			}
		}

	},
	addTask: function(newTask) { // Adds new task to tasks array
		var newId = 0;
		for (var i = 0; i < todo.tasks.length; i ++) {
			if (newId < todo.tasks[i].id) {
				newId = todo.tasks[i].id;
			} else if (!todo.tasks[i].id) {
				newId = 0;
			}
		}
		newId = newId + 1;
		todo.tasks.push({ task: newTask, done: false, id: newId }); // Add new task to array
		todo.listTasks("one", false, newId); // Print on screen
		todo.taskLocalStorage("backup");
	},
	doneTask: function(taskID) { // Finds and marks task done (done = true)
		for (var i = 0; i < todo.tasks.length; i++) {
			if (todo.tasks[i].id === taskID) {
				todo.tasks[i].done = true;
				var task = document.getElementById(todo.tasks[i].id);
				task.parentNode.removeChild(task);
				todo.listTasks("one", true, todo.tasks[i].id);
			}
		}
		todo.taskLocalStorage("backup");
	},
	undoneTask: function(taskID) { // Finds and marks task !done (done = false)
		for (var i = 0; i < todo.tasks.length; i++) {
			if (todo.tasks[i].id === taskID) {
				todo.tasks[i].done = false;
				var task = document.getElementById(todo.tasks[i].id);
				task.parentNode.removeChild(task);
				todo.listTasks("one", false, todo.tasks[i].id);
			}
		}
		todo.taskLocalStorage("backup");
	},
	deleteTask: function(taskID) { // Finds and deletes task
		for (var i = 0; i < todo.tasks.length; i++) {
			if (todo.tasks[i].id === taskID) {
				var task = document.getElementById(todo.tasks[i].id);
				todo.tasks.splice(i, 1);
				task.parentNode.removeChild(task);
			}
		}
		todo.taskLocalStorage("backup");
	}
};

var submitForm = document.getElementById("submit-form");
submitForm.addEventListener("submit", function(event) {
	event.preventDefault();
	var input = document.getElementById("task-input");
	todo.addTask(input.value);
	input.value = "";
	return false;
}, false);







