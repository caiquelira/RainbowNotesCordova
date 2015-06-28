(function () {

	//Local Variables


	//Event registration:

	$('.help-btn').on('click', function() {
        alert("Teste de Notificação");
    });

	document.addEventListener('deviceReady', function () {
		if (navigator.notification) {
			window.alert = function (message) {
				navigator.notification.alert(message, null, "Rainbow Notes", 'OK');
			}
		}
	}, false);


}());