(function () {

	//Local Variables
	NoteView.prototype.template = Handlebars.compile($("#note-tpl").html());
	AddView.prototype.template  = Handlebars.compile($("#add-tpl" ).html());
	//console.log(NoteView.prototype);
	var service = new NoteService();

	service.initialize(true);

	router.addRoute('', function () {
		var note = service.findById(0);
		console.log(note);
		$('#screen').html(new NoteView().render(note));
	});

	router.addRoute('note/:id', function (id) {
		var note = service.findById(parseInt(id));
		$('#screen').html(new NoteView().render(note));
	})

	router.start();

	console.log('router started');

	function goHome () {
		console.log('going home');
		goNote(0);
	}

	function goNote(id) {
		console.log('goNote');
		var note = service.findById(id);
	}

	function goAdd(parent) {
		console.log('goAdd: ' + parent);
		$('#screen').html(new AddView(service).render(parent));
	}

	//goHome();
	//goAdd({id: 0, title: "Home"});
			

	//service.findById().done(function (note) {console.log(note);} );


	//Event registration:

	$("#link-home").click(goHome);
	$("#link-settings").click(function () {alert("Developed by:\n-Caíque Lira\n-Lucas Müller");});
	document.addEventListener('deviceReady', function () {
		if (navigator.notification) {
			window.alert = function (message) {
				navigator.notification.alert(message, null, "Rainbow Notes", 'OK');
			}
		}
	}, false);



}());