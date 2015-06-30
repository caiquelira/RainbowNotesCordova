function TestGraph() {
	var root = newNote("root", "Minhas notas", 0);

	var urgente = newNote("Urgente", "", 1);
	var ita = newNote("ITA", "", 2);
	root.addChildren(urgente, ita);

	var ces22 = newNote("CES-22", "", 3);
	var ctc20 = newNote("CTC-20", "", 4);
	ita.addChildren(ces22, ctc20);

	var boot = newNote("Projeto Boot", "Terminar.", 5);
	var anima = newNote("Projeto Anima", "Uso da Biblioteca javafx.", 6);
	var web = newNote("Projeto Web", "", 7);
	ces22.addChildren(boot, anima, web);

	var atividade17 = newNote("Atividade 17", "Fazer atividade 17", 8);
	var aula4 = newNote("Aula 4", "Grafos.\nÁrvode de custo mínimo.\nKruskal.", 9);
	ctc20.addChildren(atividade17, aula4);

	var app = newNote("Aplicativo", "Android.\nInterface.\nFuncionalidades.", 10);
	var servidor = newNote("Servidor", "python ou node.js.\nParse.\nSincronização utilizando http.", 11);
	web.addChildren(app, servidor);

	urgente.addChildren(web, atividade17);

	var notes = [root, urgente, ita, ces22, ctc20, boot, anima, web, atividade17, aula4, app, servidor];

	console.log('original root');
	console.log(root);

	return notes;
}

var NoteService = function () {
	this.initialize = function () {
		var deferred = $.Deferred();
		window.localStorage.setItem("notes", JSON.stringify(TestGraph()));
		deferred.resolve();
		return deferred.promise();
	}

	this.findRoot = function () {
		return this.findById(0);
	}

	this.findById = function (_id) {
		var deferred = $.Deferred();
		var notes = JSON.parse(window.localStorage.getItem("notes"));
		var res = null;
		var len = notes.length;

		for (var i = 0; i < len; i++) {
			if (notes[i].id === _id) {
				res = notes[i];
				break;
			}
		};
		deferred.resolve(res);
		return deferred.promise();
	}

}





function createId () {
	return Math.floor(Math.random()*1000000000);
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
		id:       (_id === undefined) ? createId() : _id,
		addChildren: addChildren,
		removeChild: removeChild
	};
}