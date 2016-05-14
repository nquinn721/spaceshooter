'use strict'
define('client/player', ['client/io', 'playerBase'], function(io, PlayerBase) {
	function Player(player, stage) {
		PlayerBase.call(this);
		this.isPlayer = true;
		this.io = io;
		this.player = player;
		this.stage = stage;
		// this.x = stage.canvas.width / 2;
		// this.y = stage.canvas.height / 2;
		this.x = player.x;
		this.y = player.y;
		this.w = 50;
		this.h = 100;
		this.isMoving = false;
		this.angle = 0;
		this.speed = 0;
		this.maxSpeed = 4;
		this.acceleration = 20;
		this.stoppingDistance = 20;
		this.client = true;
		this.sprite = document.getElementById('player');

	}
	Player.prototype = Object.create(PlayerBase.prototype, {
		update : {
			value : function(player) {
				this.player = player;
			}
		},
	
		resize : {
			value : function() {
				// this.x = this.stage.canvas.width / 2;
				// this.y = this.stage.canvas.height / 2;	
			}
		},
		draw : {
			value : function () {
				var self = this;
				this.stage.rotate(this.angle, this.x, this.y, this.w, this.h, function (x,y,w,h) {
					self.stage.ctx.drawImage(self.sprite, x, y,w,h);
				});
			}
		}
	});
	return Player;
});
