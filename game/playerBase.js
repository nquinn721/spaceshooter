'use strict'
define('playerBase', ['base'],function(BaseClass) {
	function PlayerBase() {
		
	}
	PlayerBase.prototype = Object.create(BaseClass.prototype, {
			rotate : {
				value : function(dir) {
					if(dir === 'left')
						this.angle -= 5;
					if(dir === 'right')
						this.angle += 5;
		
				}
			},
			keydown : {
				value : function(keyCode) {
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
				}
			},
			keyup : {
				value : function(keyCode) {
					var self = this;
					if(keyCode === 38){
						this.stop();
					}
					if(this.client)
						this.io.emit('keyup', keyCode);
				}
			},
			accelerate : {
				value : function() {
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
				}
			},
			stop : {
				value : function() {
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
				}
			},
			phoneMove : {
				value : function(obj) {
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
			},
			plain : {
				value : function() {
					return {
						x : this.item.x,
						y : this.item.y,
						w : this.item.w,
						h : this.item.h,
						id : this.item.id,
						angle : this.item.angle,
						hit : this.hit
					}
				}
			},
			move : {
				value : function() {
						var x = this.x + (this.speed * Math.cos(this.angle * Math.PI / 180)),
							y = this.y + (this.speed * Math.sin(this.angle * Math.PI / 180));
						this.body.setPosition (x,y);
					// if(this.x + this.w >= this.grid.config.gridSize.width)
					// 	this.x = this.grid.config.gridSize.width - this.w;
					// if(this.x <= 0)
					// 	this.x = 0;
					// if(this.y + this.h >= this.grid.config.gridSize.height)
					// 	this.y = this.grid.config.gridSize.height - this.h;
					// if(this.y <= 0)
					// 	this.y = 0;

					if(!this.client)
						this.item.move(this);
				
				}
			}
		})

	return PlayerBase;
});