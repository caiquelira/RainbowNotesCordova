function TestGraph() {
	var root = newNote("Home", "Minhas notas", 0);

	var urgente = newNote("Urgente");
	var ita = newNote("ITA");
	root.addChildren(urgente, ita);
	ita.addParents(root);
	urgente.addParents(root);

	var ces22 = newNote("CES-22");
	var ctc20 = newNote("CTC-20");
	ita.addChildren(ces22, ctc20);
	ces22.addParents(ita);
	ctc20.addParents(ita);

	var boot = newNote("Projeto Boot", "Terminar.");
	var anima = newNote("Projeto Anima", "Uso da Biblioteca javafx.");
	var web = newNote("Projeto Web", "");
	ces22.addChildren(boot, anima, web);
	boot.addParents(ces22);
	anima.addParents(ces22);
	web.addParents(ces22);

	var atividade17 = newNote("Atividade 17", "Fazer atividade 17");
	var aula4 = newNote("Aula 4", "Grafos.\r\nÁrvore geradora de custo mínimo.\r\nKruskal.");
	ctc20.addChildren(atividade17, aula4);
	atividade17.addParents(ctc20);
	aula4.addParents(ctc20);

	var app = newNote("Aplicativo", "Android (Cordova).\r\nInterface.\r\nFuncionalidades.");
	var servidor = newNote("Servidor", "python ou node.js.\r\nParse.\r\nSincronização utilizando http.");
	web.addChildren(app, servidor);
	app.addParents(web);
	servidor.addParents(web);

	urgente.addChildren(web, atividade17);
	atividade17.addParents(urgente);
	web.addParents(urgente);

	var notes = [root, urgente, ita, ces22, ctc20, boot, anima, web, atividade17, aula4, app, servidor];

	console.log('original root');
	console.log(root);

	return notes;
}

var NoteService = function () {
	this.initialize = function (reset) {
		//window.localStorage.setItem("notes", JSON.stringify(TestGraph()));
		//console.log('reset: ' + reset);
		if (reset) {
			window.localStorage.clear();	
		}
		var notes = TestGraph();
		for (var i = 0; i < notes.length; i++) {
			window.localStorage.setItem(notes[i].id, JSON.stringify(notes[i]))
		};
	}

	this.findRoot = function () {
		return this.findById(0);
	}

	this.findById = function (_id) {
		//var notes = JSON.parse(window.localStorage.getItem("notes"));
		console.log('id = ' + _id);
		var res = JSON.parse(window.localStorage.getItem(_id));
		/*var len = notes.length;
		for (var i = 0; i < len; i++) {
			if (notes[i].id === _id) {
				res = notes[i];
				break;
			}
		}*/;
		res.childrenList = [];
		res.parentsList = [];
		for (var i = 0; i < res.children.length; i++) {
			var child = JSON.parse(window.localStorage.getItem(res.children[i]));
			res.childrenList.push({id: res.children[i], title: child.title});
		};
		for (var i = 0; i < res.parents.length; i++) {
			var parent = JSON.parse(window.localStorage.getItem(res.parents[i]));
			res.parentsList.push({id: res.parents[i], title: parent.title});
		};
		return res;
	}

	this.getTitle = function (_id) {
		var note = this.findById(_id);
		return note.title;
	}

	this.setNote = function (note) {
		window.localStorage.setItem(note.id, JSON.stringify(note));
	}

	this.link = function (parentId, childId) {
		console.log('linkou');
		var parent = JSON.parse(window.localStorage.getItem(parentId));
		parent.children.push(childId);
		console.log('linked');
		console.log(parent);
		this.setNote(parent);
	}

	this.deleteNote = function (_id) {
		var deletedNote = JSON.parse(window.localStorage.getItem(_id));
		window.localStorage.removeItem(_id);
		for (var i = 0; i < deletedNote.children.length; i++) {
			var childId = deletedNote.children[i];
			var child = JSON.parse(window.localStorage.getItem(childId));
			for (var i = 0; i < child.parents.length; i++) {
				if (child.parents[i] == _id) {
					child.parents.splice(i, i+1);
				}
			}
			window.localStorage.setItem(child.id, JSON.stringify(child));
		};
		for (var i = 0; i < deletedNote.parents.length; i++) {
			var parentId = deletedNote.parents[i];
			var parent = JSON.parse(window.localStorage.getItem(parentId));
			for (var i = 0; i < parent.children.length; i++) {
				if (parent.children[i] == _id) {
					parent.children.splice(i, i+1);
				}
			}
			window.localStorage.setItem(parent.id, JSON.stringify(parent));
		};
	}

	this.hello = "hello world";

}





function createId () {
	var idCount = window.localStorage.getItem('idCount');
	if (idCount === null) {
		idCount = 1;
	}
	window.localStorage.setItem('idCount', parseInt(idCount)+1);
	return parseInt(idCount);
};

function newNote (_title, _text, _id) {
	function addChildren () {
		for (var i = 0; i < arguments.length; i++) {
			this.children.push(arguments[i].id);
		};
	};
	function addChildrenId () {
		for (var i = 0; i < arguments.length; i++) {
			this.children.push(arguments[i]);
		};
	};
	function removeChild (id) {
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i] == id) {
				this.children.splice(i,i+1);
				return;
			}
		};
	};

	function addParents () {
		for (var i = 0; i < arguments.length; i++) {
			this.parents.push(arguments[i].id);
		};
	};
	function addParentsId () {
		for (var i = 0; i < arguments.length; i++) {
			this.parents.push(arguments[i]);
		};
	};
	function removeParent (id) {
		for (var i = 0; i < this.parents.length; i++) {
			if (this.parents[i] == id) {
				this.parents.splice(i,i+1);
				return;
			}
		};
	};

	return {
		title:    _title,
		text:     (_text === undefined) ? "" : _text,
		children: [],
		parents: [],
		id:       (_id == 0) ? _id : createId(),
		addChildren: addChildren,
		addChildrenId: addChildrenId,
		addParents: addParents,
		removeParent: removeParent,
		addParentsId: addParentsId,
		removeChild: removeChild
	};
}