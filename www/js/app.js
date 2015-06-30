(function () {

	//Local Variables
	NoteView.prototype.template = Handlebars.compile($("#note-tpl").html());
	AddView.prototype.template  = Handlebars.compile($("#add-tpl" ).html());
	console.log(NoteView.prototype);
	var service = new NoteService();

	service.initialize().done( function () {
		service.findRoot().done( function (root) {
			$('body').html(new NoteView().render(root));
			
		});
	}
		);

		//service.findById().done(function (note) {console.log(note);} );


	//Event registration:

	///$('.help-btn').on('click', function() {
    ///    alert("Teste de Notificação");
    ///});

	document.addEventListener('deviceReady', function () {
		if (navigator.notification) {
			window.alert = function (message) {
				navigator.notification.alert(message, null, "Rainbow Notes", 'OK');
			}
		}
	}, false);



}());