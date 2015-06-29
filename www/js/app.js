(function () {

	//Local Variables
	var homeTpl = Handlebars.compile($("#home-tpl").html());
	var noteTpl = Handlebars.compile($("#note-tpl").html());
	var service = new NoteService();
	service.initialize().done(function () {
		var root = service.findRoot();
		//service.findRoot().done(function (root) {
			console.log(root);
		//	console.log('oioioi');
		//	//$('#note-div').html(noteTpl(root));
		//});

	console.log(noteTpl(root));

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