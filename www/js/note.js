function TestGraph() {
	var root = newNote("Notas", "Minhas notas", 0);

	var urgente = newNote("Urgente");
	var ita = newNote("ITA");
	root.addChildren(urgente, ita);

	var ces22 = newNote("CES-22");
	var ctc20 = newNote("CTC-20");
	ita.addChildren(ces22, ctc20);

	var boot = newNote("Projeto Boot", "Terminar.");
	var anima = newNote("Projeto Anima", "Uso da Biblioteca javafx.");
	var web = newNote("Projeto Web", "");
	ces22.addChildren(boot, anima, web);

	var atividade17 = newNote("Atividade 17", "Fazer atividade 17");
	var aula4 = newNote("Aula 4", "Grafos.\nÁrvode de custo mínimo.\nKruskal.");
	ctc20.addChildren(atividade17, aula4);

	var app = newNote("Aplicativo", "Android.\nInterface.\nFuncionalidades.");
	var servidor = newNote("Servidor", "python ou node.js.\nParse.\nSincronização utilizando http.");
	web.addChildren(app, servidor);

	urgente.addChildren(web, atividade17);

	var notes = [root, urgente, ita, ces22, ctc20, boot, anima, web, atividade17, aula4, app, servidor];

	console.log('original root');
	console.log(root);

	return notes;
}

var NoteService = function () {
	this.initialize = function (reset) {
		var deferred = $.Deferred();
		//window.localStorage.setItem("notes", JSON.stringify(TestGraph()));
		//console.log('reset: ' + reset);
		if (reset) {
			window.localStorage.clear();	
		}
		var notes = TestGraph();
		for (var i = 0; i < notes.length; i++) {
			window.localStorage.setItem(notes[i].id, JSON.stringify(notes[i]))
		};
		deferred.resolve();
		return deferred.promise();
	}

	this.findRoot = function () {
		return this.findById(0);
	}

	this.findById = function (_id) {
		var deferred = $.Deferred();
		//var notes = JSON.parse(window.localStorage.getItem("notes"));
		var res = JSON.parse(window.localStorage.getItem(_id));
		/*var len = notes.length;
		for (var i = 0; i < len; i++) {
			if (notes[i].id === _id) {
				res = notes[i];
				break;
			}
		}*/;
		deferred.resolve(res);
		return deferred.promise();
	}

	this.addNote = function (note) {
		var deferred = $.Deferred();


	}

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
	function removeChild (id) {
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i] == id) {
				this.children.splice(i,i+1);
				return;
			}
		};
	};

	return {
		title:    _title,
		text:     (_text === undefined) ? "" : _text,
		children: [],
		id:       (_id == 0) ? _id : createId(),
		addChildren: addChildren,
		removeChild: removeChild
	};
}