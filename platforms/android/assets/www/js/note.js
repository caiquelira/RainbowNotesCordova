function TestGraph() {
	var root = newNote("root", "Minhas notas", 0);

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

	var atividade17 = newNote("Atividade 17", "Fazer atividade 17");
	var aula4 = newNote("Aula 4", "Grafos.\nÁrvode de custo mínimo.\nKruskal.");
	ctc20.addChildren(atividade4, aula4);

	var app = newNote("Aplicativo", "Android.\nInterface.\nFuncionalidades.");
	var servidor = newNote("Servidor", "python ou node.js.\nParse.\nSincronização utilizando http.");
	web.addChildren(app, servidor);

	urgente.addChildren(web, atividade17);

	var notes = [root, urgente, ita, ces22, ctc20, boot, anima, web, atividade17, aula4, app, servidor];

	return notes;
}

var NoteService = function () {
	this.initialize = function () {
		var deferred = $.Deferred();
		this.db = window.openDatabase("NoteDB", "1.0", "Rainbow Note DB", 200000);
		this.db.transaction(
			function (tx) {
				createTable(tx);
				addSampleData(tx);
			},
			function (error) {
				alert('Transaction error: ' + error.message);
				deferred.reject('Transaction error: ' + error.message);
			},
			function () {
				alert('Transaction success');
				deferred.resolve();
			}
		);
		return deferred.promise();
	}

	this.findRoot = function () {
		return findById(0);
	}

	this.findById = function (_id) {
		var deferred = $.Deferred();
		this.db.transaction(
			function (tx) {
				var sql = "SELECT * " +
						  "FROM notes" +
						  "WHERE id=" + _id;
				tx.executeSql(sql,
							  null,
							  function (tx, results) {
							  	deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
							  }
				);
			},
			function (error) {
				deferred.reject("Transaction error: " + error.message);
			}
		);
		var note = deferred.promise();
		if (!note)	return null;
		note.children = [];
		this.db.transaction(
			function (tx) {
				var sql = "SELECT idChild" +
						  "FROM children" +
						  "WHERE idParent=" + _id;
				tx.executeSql(sql, null,
							  function (tx, results) {
							  	for (var i = 0; i < results.rows.length; i++) {
							  		var row = results.row.item(i);
							  		children.push(row['id']);
							  	};
							  }
				);
			},
			function (error) {
				alert("Transaction error: " + error.message);
			}
		);
		return note;
	}

	var createNoteTable = function (tx) {
		//tx.executeSql('DROP TABLE IF EXISTS notes');
		var sql = "CREATE TABLE IF NOT EXISTS notes ( " +
				  "id INTEGER PRIMARY KEY, " +
				  "title VARCHAR(50), "
				  "text  VARCHAR(500))";
		tx.executeSql(
			sql,
			null, 
			function ()          { alert('Create Note Table success')  },
			function (tx, error) { alert('Create Note Table error: ' + error.message)}
		);
	}

	var createChildrenTable = function (tx) {
		//tx.executeSql('DROP TABLE IF EXISTS children');
		var sql = "CREATE TABLE IF NOT EXISTS children ( " +
				  "idParent INTEGER PRIMARY KEY, " +
				  "idChild  INTEGER )";
		tx.executeSql(
			sql,
			null, 
			function ()     { alert('Create Children Table success')  },
			function (tx, error) { alert('Create Children Table error: ' + error.message)}
		);
	}

	var addSampleData = function (tx, notes) {
		var sql_notes = "INSERT OR REPLACE INTO notes " + 
						"(id, title, text) " +
						"VALUES (?, ?, ?)";
		var sql_children = "INSERT OR REPLACE INTO children " +
						   "(idParent, idChild) " +
						   "VALUES (?, ?)";
		for (var i = 0; i < notes.length; i++) {
			var note = notes[i];
			tx.executeSql(sql_notes,
						  [note.id, note.title, note.text],
						  function () {alert('INSERT note success');},
						  function (tx, error) {alert('INSERT note error:' + error.message)}
						  );
			for (var i = 0; i < note.children.length; i++) {
				var child = note.children[i];
				tx.executeSql(sql_children,
							 [note.id, child],
							 function () {alert('INSERT children success');},
							 function (tx, error) {alert('INSERT children error:' + error.message)}
				);
			};
		};
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