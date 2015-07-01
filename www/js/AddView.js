
var AddView = function (service) {

	this.initialize = function (service) {
		this.div = $('<div/>');
		this.service = service;	
	}

	this.render = function (parent) {
		this.div.html(this.template(parent));

		var serv = this.service;
		$('#link-cancel', this.div).click( function (event) {
			console.log(event);
			var element = $(event.toElement);
			var idParent = parseInt(element.attr('parent'));
			var parent = serv.findById(idParent);
			$('#screen').html(new NoteView().render(parent));
		});

		return this.div;
	}

	this.initialize(service);
}