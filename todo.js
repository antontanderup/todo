var todo = {
	tasks: [],
	initialise: function() {

	},
	listTasks: function() {
		var list = "";
		for (var i = 0; i < todo.tasks.length; i++) {
			if (todo.tasks[i].done === false){
				var li = '<li>' + todo.tasks[i].task + '</li>\n';
				list += li;
			}
		}
		return list;
	},
	addTask: function(newTask) {
		todo.tasks.push({ task: newTask, done: false });
	},
	doneTask: function(task) {
		for (var i = 0; i < todo.tasks.length; i++) {
			if (todo.tasks[i].task === task) {
				todo.tasks[i].done = true;
			}
		}

	}
};




todo.addTask("test this thing");
todo.addTask("test this thing2");
todo.addTask("test this thing3");
todo.doneTask("test this thing2");

var todoListContainer = document.getElementById("todo");
todoListContainer.innerHTML = todo.listTasks();