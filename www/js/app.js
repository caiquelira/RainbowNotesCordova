(function () {

	//Local Variables
	NoteView.prototype.template = Handlebars.compile($("#note-tpl").html());
	AddView.prototype.template  = Handlebars.compile($("#add-tpl" ).html());
	EditView.prototype.template  = Handlebars.compile($("#edit-tpl" ).html());
	//console.log(NoteView.prototype);
	var service = new NoteService();

	service.initialize(true);

	router.addRoute('', function () {
		var note = service.findById(0);
		console.log(note);
		$('#screen').html(new NoteView(service).render(note));
	});

	router.addRoute('note/:id', function (id) {
		console.log('id is ' + id);
		var note = service.findById(parseInt(id));
		$('#screen').html(new NoteView(service).render(note));
	})

	router.addRoute('add/:parentId', function (parentId) {
		console.log('parentId is ' + parentId);
		var parentTitle = service.getTitle(parentId);
		console.log('parentTitle is ' + parentTitle);
		$('#screen').html(new AddView(service).render({parentId: parentId, parentTitle: parentTitle}));
	});
	router.addRoute('edit/:id', function (id) {
		console.log('id is ' + id);
		var note = service.findById(parseInt(id));
		$('#screen').html(new EditView(service).render(note));
	});

	router.start();

	console.log('router started');

	//function goHome () {
	//	console.log('going home');
	//	goNote(0);
	//}
//
	//function goNote(id) {
	//	console.log('goNote');
	//	var note = service.findById(id);
	//}
//
	//function goAdd(parent) {
	//	console.log('goAdd: ' + parent);
	//	$('#screen').html(new AddView(service).render(parent));
	//}

	//goHome();
	//goAdd({id: 0, title: "Home"});
			

	//service.findById().done(function (note) {console.log(note);} );


	//Event registration:

	//$("#link-home").click(goHome);
	$("#link-settings").click(function () {alert("Developed by:\n-Caíque Lira\n-Lucas Müller");});


	document.addEventListener('deviceReady', function () {
		if (navigator.notification) {
			window.alert = function (message) {
				navigator.notification.alert(message, null, "Rainbow Notes", 'OK');
			}
		}
		if (navigator.notification) {
			window.confirm = function (callback) {
				navigator.notification.confirm("Deseja apagar a nota?", callback, "Confirmação", "Sim,Não");
			}
		}
	}, false);



}());