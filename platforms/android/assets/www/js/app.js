(function () {

	//Local Variables
	var homeTpl = Handlebars.compile($("#home-tpl").html());
	var noteTpl = Handlebars.compile($("#note-tpl").html());
	var service = new NoteService();
	service.initialize.done(function () {
		alert('Service initialized');
		service.findRoot().done(function (root) {
			$('#note-div').html(noteTpl(root));
		});
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