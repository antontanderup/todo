var todo = {
	tasks: [],
	initialise: function() {

	},
	listTask: function(id, task, ULid) {
		var ul = document.getElementById(ULid),
		li = document.createElement("li"),
		taskContent = document.createTextNode(task);
		li.appendChild(taskContent);
		li.setAttribute("id", id);
		ul.appendChild(li);		
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
			if (newId > todo.tasks[i].id) {
				newId = todo.tasks[i].id;
			} else if (!todo.tasks[i].id) {
				newId = 0;
			}
		}
		newId += 1;
		todo.tasks.push({ task: newTask, done: false, id: newId });
		todo.listTasks("one", false, newId);
	},
	doneTask: function(task) { // Finds and marks task done (done = true)
		for (var i = 0; i < todo.tasks.length; i++) {
			if (todo.tasks[i].task === task) {
				todo.tasks[i].done = true;
			}
		}
	},
	deleteTask: function(task) { // Finds and deletes task
		for (var i = 0; i < todo.tasks.length; i++) {
			if (todo.tasks[i].task === task) {
				todo.tasks.splice(i, 1);
			}
		}
	}
};




var submitTask = document.getElementById("submit-task");
submitTask.addEventListener("click", function(){
	todo.addTask(document.getElementById("task-input").value);
	todo.listTasks("latest");
}, false);







