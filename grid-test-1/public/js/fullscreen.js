var fullscreen;
$('.fullscreen').on('click', function() {
	var el = $("#game")[0];
	if(el.webkitRequestFullScreen)
		el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome

	if(el.mozRequestFullScreen)
		el.mozRequestFullScreen(); //Firefox
});
document.addEventListener('mozfullscreenchange', fullChange);
document.addEventListener('webkitfullscreenchange', fullChange);


function setCanvasSize() {
	if(fullscreen){
		manager.stage.canvas.width = window.innerWidth;
		manager.stage.canvas.height = window.innerHeight;
		manager.stage.canvas.style.marginLeft = 0;
	}else{
		manager.stage.canvas.width = .9 * window.innerWidth;
		manager.stage.canvas.height = .9 * window.innerHeight;
		manager.stage.canvas.style.marginLeft = '5%';
	}
}


function fullChange(e, a) {
	fullscreen = !fullscreen;
	setCanvasSize();
}
