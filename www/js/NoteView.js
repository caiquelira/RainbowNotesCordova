
var NoteView = function () {

	this.initialize = function () {
		this.div = $('<div/>');
	}

	this.render = function (note) {
		this.div.html(this.template(note));
		$(".help-btn", this.div).on('click', function () { alert('not implemented');/*$('body').html(AddView()); */});
		return this.div;
	}

	this.initialize();
}