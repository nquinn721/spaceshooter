'use strict'
define('client/stage', function () {
	
	function Stage(canvasEl) {
		this.el = canvasEl;
		console.log(canvasEl);
		this.canvas = document.getElementById(canvasEl);
		this.ctx = this.canvas.getContext('2d');

		this.w = this.canvas.width;
		this.h = this.canvas.height;
		this.fullscreen = false;
	}

	Stage.prototype = {
		init : function() {
			this.setCanvasSize();	
		},
		initPlayer : function(player) {
			this.player = player;	
		},
		rotate : function(angle, x, y, w, h, cb) {
			this.ctx.save();
			this.ctx.translate(x + (w / 2), y + (h / 2));

			this.ctx.rotate(angle * (Math.PI / 180));
			
			if(cb)cb(-(w / 2), -(h / 2), w, h)
			else this.ctx.fillRect(-(w / 2), -(h / 2), w, h);
			this.ctx.restore();
		},
		drawTranslated : function(cb) {
			if(!this.player)return;
			
			this.ctx.save();
			this.ctx.translate(
				-this.player.player.x + (this.canvas.width / 2), 
				-this.player.player.y + (this.canvas.height / 2));
			cb();

			this.ctx.restore();
		},
		init : function() {
			var self = this;

			$('.fullscreen').on('click', function() {
				var el = $("#" + self.el)[0];
				if(el.webkitRequestFullScreen)
					el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome

				if(el.mozRequestFullScreen)
					el.mozRequestFullScreen(); //Firefox
			});
			document.addEventListener('mozfullscreenchange', this.fullChange.bind(this));
			document.addEventListener('webkitfullscreenchange', this.fullChange.bind(this));
			this.setCanvasSize();
		},
		setCanvasSize : function () {
			if(this.fullscreen){
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
				this.canvas.style.marginLeft = 0;
			}else{
				this.canvas.width = .9 * window.innerWidth;
				this.canvas.height = .9 * window.innerHeight;
				this.canvas.style.marginLeft = '5%';
			}
		},
		fullChange : function(e, a) {
			this.fullscreen = !this.fullscreen;
			this.setCanvasSize();
		}
	}
	return Stage;
});
