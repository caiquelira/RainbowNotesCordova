
var AddView = function (service) {

	this.initialize = function (service) {
		this.div = $('<div/>');
		this.service = service;	
	}

	this.render = function (parent) {
		this.div.html(this.template(parent));

		var serv = this.service;
		$('#link-cancel', this.div).click( function (event) {
			//console.log(event);
			var element = $(event.toElement);
			var parentId = parseInt(element.attr('parent'));
			var parent = serv.findById(parentId);
			$('#screen').html(new NoteView().render(parent));
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
			var note = newNote(input.title, input.text);
			note.parents.push(parseInt(input.parentId));
			serv.setNote(note);
			serv.link(parseInt(input.parentId), note.id);
			console.log('this is the new note');
			console.log(note);

			//$.get('http://rainbownotes.parseapp.com/sync', {}, function (data) {alert(data);});

			

			//var request = new XMLHttpRequest();
			//request.open("GET", "http://rainbownotes.parseapp.com/sync", true);
			//request.onreadystatechange = function() {//Call a function when the state changes.
			//	var resp = JSON.parse(request.responseText);
			//	console.log('resposta');
			//	console.log(resp);
			//}

			$('#screen').html(new NoteView().render(note));
		});

		return this.div;
	}

	this.initialize(service);
}