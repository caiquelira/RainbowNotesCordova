
var AddView = function (service, idParent) {

	//this.template = Handlebars.compile($('#add-tpl').html());
	this.template = function () {alert('not implemented');}

	this.div = $('<div/>');

	this.div.html(template());

	return this.div;
}