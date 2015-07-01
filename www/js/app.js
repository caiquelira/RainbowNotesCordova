(function () {

	//Local Variables
	NoteView.prototype.template = Handlebars.compile($("#note-tpl").html());
	AddView.prototype.template  = Handlebars.compile($("#add-tpl" ).html());
	//console.log(NoteView.prototype);
	var service = new NoteService();

	service.initialize(true);

	function goHome () {
		console.log('going home');
		goNote(0);
	}

	function goNote(id) {
		console.log('goNote');
		var note = service.findByID(id);
		$('#screen').html(new NoteView().render(note));
	}

	function goAdd(parent) {
		console.log('goAdd: ' + parent);
		$('#screen').html(new AddView(service).render(parent));
	}

	//goHome();
	goAdd({id: 0, title: "Home"});
			

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