$(document).ready(function () {
	$('.content').html($('#content-parents').html());
});

$('#link-parent').click(function () {
	$('.content').html($('#content-parents').html());
});
$('#link-text').click(function () {
	$('.content').html($('#content-text').html());
});
$('#link-children').click(function () {
	$('.content').html($('#content-children').html());
});