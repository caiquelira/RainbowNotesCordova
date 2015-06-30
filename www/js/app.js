(function () {

	//Local Variables
	var homeTpl = Handlebars.compile($("#home-tpl").html());
	var noteTpl = Handlebars.compile($("#note-tpl").html());
	var addTpl  = Handlebars.compile($("#add-tpl" ).html());
	var service = new NoteService();
	service.initialize().done(function () {
		service.findRoot().done(function (root) {
			console.log(root. 	.length);
			console.log(root);
			$('#note-div').html(noteTpl(root));
		});

		//service.findById().done(function (note) {console.log(note);} );

		console.log('Service initialized');
	});


	//Event registration:

	$('.help-btn').on('click', function() {
        alert("Teste de Notificação");
    });

	document.addEventListener('deviceReady', function () {
		if (navigator.notification) {
			window.alert = function (message) {
				navigator.notification.alert(message, null, "Rainbow Notes", 'OK');
			}
		}
	}, false);



}());