
var NoteView = function () {

	this.initialize = function () {
		this.div = $('<div/>');
	}

	this.render = function (note) {
		this.div.html(this.template(note));
		$('#content-parents', this.div).hide();
		$('#content-text', this.div).hide();
		$('#content-children', this.div).hide();

		//start active		
		$('#link-children', this.div).addClass('active');
		$('.content', this.div).html($('#content-children', this.div).html());


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

		$('.icon-compose', this.div).click(function () {alert('button edit');});
		$('.icon-trash', this.div).click(function () {alert('button delete');});
		$('.icon-home', this.div).click(function () {alert('button home');});
		return this.div;
	}

	this.initialize();
}