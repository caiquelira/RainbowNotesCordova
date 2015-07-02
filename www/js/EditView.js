
var EditView = function (service) {

	this.initialize = function (service) {
		this.div = $('<div/>');
		this.service = service;	
	}

	this.render = function (note) {
		this.div.html(this.template(note));

		var serv = this.service;
		$('#link-cancel', this.div).click( function (event) {
			//console.log(event);
			var element = $(event.toElement);
			var myid = parseInt(element.attr('myid'));
			var back = serv.findById(myid);
			$('#screen').html(new NoteView().render(back));
		});
		$('#link-confirm', this.div).click( function (event) {
			var element = $(event.toElement);
			//console.log(event.toElement);
			//console.log($(event.toElement).parents().last());
			var html_ = element.parents().last();
			var form = $('form', html_);
			var formArray = form.serializeArray();
			var input = {};
			for (var i = 0; i < formArray.length; i++) {
				var el = formArray[i];
				input[el.name] = el.value;
			};

			//console.log(input);
			var myid = parseInt(input.id);
			var note = serv.findById(myid);
			note.title = input.title;
			note.text = input.text;
			serv.setNote(note);
			$('#screen').html(new NoteView().render(note));
		});

		return this.div;
	}

	this.initialize(service);
}