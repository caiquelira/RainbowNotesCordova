
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
			var parentId = parseInt(element.attr('parent'));
			var parent = serv.findById(parentId);
			$('#screen').html(new NoteView().render(parent));
		});
		$('#link-confirm', this.div).click( function (event) {
			alert('confirm');
		});

		return this.div;
	}

	this.initialize(service);
}