
function TestGraph() {
	var root = new Note("Root", "Minhas notas");

	var urgente = new Note("Urgente");
	var ita = new Note("ITA");
	root.addChildren(urgente, ita);

	var ces22 = new Note("CES-22");
	var ctc20 = new Note("CTC-20");
	ita.addChildren(ces22, ctc20);

	var boot = new Note("Projeto Boot", "Terminar.");
	var anima = new Note("Projeto Anima", "Uso da Biblioteca javafx.");
	var web = new Note("Projeto Web");
	ces22.addChildren(boot, anima, web);

	var atividade4 = new Note("Atividade 4", "Fazer atividade 4");
	var aula4 = new Note("Aula 4", "Grafos.\nÁrvode de custo mínimo.\nKruskal.");
	ctc20.addChildren(atividade4, aula4);

	var app = new Note("Aplicativo", "Android.\nInterface.\nFuncionalidades.");
	var servidor = new Note("Servidor", "python ou node.js.\nParse.\nSincronização utilizando http.");
	web.addChildren(app, servidor);

	return root;
}

function Note (_title, _text) {
	var title    = _title;
	var text     = (_text    === undefined) ? "" : _text;
	var children = [];
	var id       = createId()

	function createId () {
		return Math.floor(Math.random()*100000000000000000);
	};

	this.getId = function () {
		return id;
	};
	this.getTitle = function () {
		return title;
	};
	this.getText = function () {
		return text;
	};
	this.getChildren = function () {
		return children;
	};

	this.setTitle = function (t) {
		title = t;
	};
	this.setText = function (t) {
		text = t;
	};
	this.addChildren = function () {
		for (var i = 0; i < arguments.length; i++) {
			children.push(arguments[i]);
		};
	};
	this.removeChild = function (id) {
		for (var i = 0; i < children.length; i++) {
			if (children[i].getId() == id) {
				children.splice(i,i+1);
				return;
			}
		};
	};
}