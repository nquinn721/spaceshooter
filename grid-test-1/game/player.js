'use strict'
define('player', function() {
	function Player() {
		
	}
	Player.prototype = {
		sup : function() {
			console.log('hi suip');
		},
		rotate : function(dir) {
			if(dir === 'left')
				this.angle -= 5;
			if(dir === 'right')
				this.angle += 5;

		},
		keydown : function(keyCode) {
			var self = this;
			if(keyCode === 37)
				this.rotate('left');
			if(keyCode === 39)
				this.rotate('right');
			if(keyCode === 38){
				this.accelerate();
			}
			if(this.client)
				this.io.emit('keydown', keyCode);
		},
		keyup : function(keyCode) {
			var self = this;
			if(keyCode === 38){
				this.stop();
			}
			if(this.client)
				this.io.emit('keyup', keyCode);
		},
		accelerate : function() {
			var self = this;

			clearInterval(this.slowDown);
			this.slowDown = false;
			if(!this.speedUp){
				this.isMoving = true;	
				this.speedUp = setInterval(function() {
					self.speed += 0.1;

					if(self.speed >= self.maxSpeed){
						self.maxSpeedMet = true;
						clearInterval(self.speedUp);
					}
					
				}, this.acceleration);
				
			}
		},
		stop : function() {
			var self = this;

			clearInterval(this.speedUp);
			this.speedUp = false;
			if(!this.slowDown){

				this.slowDown = setInterval(function() {
					self.speed -= 0.1;
					self.maxSpeedMet = false;

					if(self.speed <= 0){
						self.isMoving = false;	
						clearInterval(self.slowDown)
					}
					
				}, this.stoppingDistance)
			}
		},
		phoneMove : function(obj) {
			if(obj.move < 90)return;

			if(obj.angle < 85 || obj.angle > 95){
				if(obj.angle < 90)
					this.rotate('left');
				else this.rotate('right');
				
			}
			if(obj.move < 165)
				this.accelerate();
			else this.stop();
		}
	}

	return Player;
});