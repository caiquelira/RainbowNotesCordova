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
		this.db = window.openDatabase("NoteDB", "1.0", "Rainbow Note DB", 200000);
		this.db.transaction(
			function (tx) {
				console.log('transaction happening');
				createNoteTable(tx);
				createChildrenTable(tx);
				addSampleData(tx, TestGraph());
			},
			function (error) {
				alert('Transaction error: ' + error.message);
				deferred.reject('Transaction error: ' + error.message);
			},
			function () {
				console.log('Transaction success');
				deferred.resolve();
			}
		);
		return deferred.promise();
	}

	this.findRoot = function () {
		return this.findById(0);
	}

	this.findById = function (_id) {
		var deferred = $.Deferred();
		var DB = this.db;
		this.db.transaction(
			function (tx) {
				var sql = "SELECT * " +
						  "FROM notes " +
						  "WHERE id="+_id;
				tx.executeSql(sql,
							  null,
							  function (tx, results) {
							  	deferred.resolve(results.rows.item(0), DB);
							  },
							  function (tx, error) {
							  	alert(error.message);
							  }
				);	
			},
			function (error) {
				deferred.reject("Transaction error: " + error.message);
			}
		);
		//console.log(deferred);
		//deferred.promise();
		//console.log('note:');
		//console.log(note);
		//if (!note)	return null;
		deferred.done( function (note, db) {
			note.children = [];
			db.transaction(
				function (tx) {
					var sql = "SELECT idChild " +
							  "FROM children " +
							  "WHERE idParent=" + _id;
					tx.executeSql(sql, null,
								  function (tx, results) {
								  	//console.log(results.rows);
								  	for (var i = 0; i < results.rows.length; i++) {
								  		var row = results.rows.item(i);
								  		note.children.push(row['idChild']);
								  	};
								  	deferred.resolve(note);
								  }
					);
				},
				function (error) {
					alert("Transaction error: " + error.message);
				}
			);
		});
		return deferred.promise();
	}

	var createNoteTable = function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS notes');
		var sql = "CREATE TABLE IF NOT EXISTS notes ( " +
				  "id INTEGER PRIMARY KEY, " +
				  "title VARCHAR(50), " +
				  "text  VARCHAR(500))";
		tx.executeSql(
			sql,
			null, 
			function ()          { console.log('Create Note Table success')  },
			function (tx, error) { alert('Create Note Table error: ' + error.message)}
		);
	}

	var createChildrenTable = function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS children');
		var sql = "CREATE TABLE IF NOT EXISTS children ( " +
				  "idParent INTEGER, " +
				  "idChild  INTEGER )";
		tx.executeSql(
			sql,
			null, 
			function ()     { console.log('Create Children Table success')  },
			function (tx, error) { alert('Create Children Table error: ' + error.message)}
		);
	}

	var addSampleData = function (tx, notes) {
		console.log('start sample');
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
						  function () {console.log('INSERT note success');},
						  function (tx, error) {alert('INSERT note error:' + error.message)}
						  );
			for (var j = 0; j < note.children.length; j++) {
				var child = note.children[j];
				console.log('adding pair: <' + note.id + ', ' + child + '>');
				tx.executeSql(sql_children,
							 [note.id, child],
							 function () {console.log('INSERT children success');},
							 function (tx, error) {alert('INSERT children error:' + error.message)}
				);
			};
		};
		console.log('end sample');
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