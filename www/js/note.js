
function TestGraph() {
	var root = newNote("Root", "Minhas notas");

	var urgente = newNote("Urgente");
	var ita = newNote("ITA");
	root.addChildren(urgente, ita);

	var ces22 = newNote("CES-22");
	var ctc20 = newNote("CTC-20");
	ita.addChildren(ces22, ctc20);

	var boot = newNote("Projeto Boot", "Terminar.");
	var anima = newNote("Projeto Anima", "Uso da Biblioteca javafx.");
	var web = newNote("Projeto Web");
	ces22.addChildren(boot, anima, web);

	var atividade4 = newNote("Atividade 4", "Fazer atividade 4");
	var aula4 = newNote("Aula 4", "Grafos.\nÁrvode de custo mínimo.\nKruskal.");
	ctc20.addChildren(atividade4, aula4);

	var app = newNote("Aplicativo", "Android.\nInterface.\nFuncionalidades.");
	var servidor = newNote("Servidor", "python ou node.js.\nParse.\nSincronização utilizando http.");
	web.addChildren(app, servidor);

	return root;
}


function createId () {
	return Math.floor(Math.random()*100000000000000000);
};

function newNote (_title, _text) {
	function addChildren () {
		for (var i = 0; i < arguments.length; i++) {
			this.children.push(arguments[i]);
		};
	};
	function removeChild (id) {
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i].getId() == id) {
				this.children.splice(i,i+1);
				return;
			}
		};
	};

	return {
		title:    _title,
		text:     (_text === undefined) ? "" : _text,
		children: [],
		id:       createId(),
		addChildren: addChildren,
		removeChild: removeChild
	};
}