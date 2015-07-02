
var NoteView = function (service) {

	this.initialize = function (service) {
		this.div = $('<div/>');
		this.service = service;	
	}

	this.render = function (note) {
		this.div.html(this.template(note));

		var serv = this.service;
		$('#content-parents', this.div).hide();
		$('#content-text', this.div).hide();
		$('#content-children', this.div).hide();

		//start active
		console.log(note);
		if (note.children.length > 0) {
			$('#link-children', this.div).addClass('active');
			$('.content', this.div).html($('#content-children', this.div).html());
		}
		else {
			$('#link-text', this.div).addClass('active');
			$('.content', this.div).html($('#content-text', this.div).html());
		}


		$('#link-parents',this.div).click(function () {
			$('.content',this.div).html($('#content-parents', this.div).html());
			$('#link-parents', this.div).addClass('active');
			$('#link-text', this.div).removeClass('active');
			$('#link-children', this.div).removeClass('active');
		});
		$('#link-text', this.div).click(function () {
			$('.content', this.div).html($('#content-text', this.div).html());

			$('#link-parents', this.div).removeClass('active');
			$('#link-text', this.div).addClass('active');
			$('#link-children', this.div).removeClass('active');
		});
		$('#link-children', this.div).click(function () {
			$('.content', this.div).html($('#content-children', this.div).html());

			$('#link-parents', this.div).removeClass('active');
			$('#link-text', this.div).removeClass('active');
			$('#link-children', this.div).addClass('active');
		});

		//$('.icon-compose', this.div).click(function () {alert('button edit');});
		var deleteCallback = function (pressed) {
			console.log('pressed button');
			console.log(pressed);
			if (pressed == 1) {
				var id_ = $('.icon-trash', this.div).attr('myid');
				serv.deleteNote(id_);
				$('#screen', this.div).html(new NoteView().render(serv.findRoot()));
			}
		}
		$('.icon-trash', this.div).click( function () {
			window.confirm("Deseja apagar a nota?", deleteCallback, "Confirmação", "Sim,Não");
		});
		//$('.icon-home', this.div).click(function () {alert('button home');});
		return this.div;
	}

	this.initialize(service);
}