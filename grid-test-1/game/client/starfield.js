'use strict'
define('client/starfield', function() {
	
	function Star(obj) {
		for(var i in obj)
			this[i] = obj[i];	
		
	}
	Star.prototype = {

	}

	function Starfield(stage) {
		this.stage = stage;
		this.ctx = stage.ctx;
		this.stars = [];
		this.angle = false;
		this.starSpeed = 1;

		this.fillStyle = 'rgba(255,255,255,0.4)';
	}

	Starfield.prototype = {
		init : function() {
			this.setupStars();
		},
		initPlayer : function(player) {
			this.player = player;
		},
		setupStars : function() {
			this.totalStars = this.stage.canvas.width * this.stage.canvas.height / 200;
			for(var i = 0; i < this.totalStars; i++)
				this.createStar();
		},
		createStar : function(x, y, size) {
			if(!x)x = Math.random() * this.stage.canvas.width;
			if(!y)y = Math.random() * this.stage.canvas.height;
			if(!size)size = Math.round(Math.random() * 0.7) + 0.3;

			this.stars.push(new Star({
				x : x,
				y : y,
				w : size,
				h : size
			}));	
		},
		setAngle : function(angle) {
			this.angle = angle + 90;
		},
		stopMoving : function() {
			this.angle = false;
		},
		move : function(star) {
			star.x += this.starSpeed * Math.cos(this.angle * Math.PI / 180);
			star.y += this.starSpeed * Math.sin(this.angle * Math.PI / 180);
		},
		resize : function() {
			this.stars = [];
			this.setupStars();
		},
		draw : function() {
			var star;
			if(!this.player)return;

			if(this.player.isMoving)this.setAngle(this.player.angle);
			else this.stopMoving();

			this.starSpeed = this.player.speed;

			this.ctx.fillStyle = this.fillStyle;

			for(var i = 0; i < this.stars.length; i++){
				star = this.stars[i];
				this.ctx.fillRect(star.x, star.y, star.w, star.h);
				typeof this.angle !== 'boolean' && this.move(star, 70);
				this.checkBounds(star, i);
			}
		},
		checkBounds : function(star, index) {
			if(star.x >= this.stage.canvas.width || star.y >= this.stage.canvas.height || star.x <= 0 || star.y <= 0){
				this.stars.splice(index,1);
				this.createStar(this.stage.canvas.width - star.x, this.stage.canvas.height - star.y);
			}
		}
	}
	return Starfield;
});
