'use strict'
define('client/manager', ['managerBase', 'client/player', 'box2d/world'], 
	function(ManagerBase, Player, World) {

	function Manager(canvasEl, Stage) {
		ManagerBase.call(this);

		this.stage = new Stage(canvasEl);
		this.stage.init();

		this.classes = [];
		this.items;
		this.player;
		this.frames = 0;

		this.playerSprite = document.getElementById('player');
		
	}

	Manager.prototype = Object.create(ManagerBase.prototype, {
			init : {
				value : function(player) {
					if(!this.player){
						this.player = this.createItem('player', new Player(player, this.stage));
						this.classes.push(this.player);
						this.draw();
						this.world.init(this.stage.debugCTX);
						this.windowResize();
						this.setupEvents();
						this.initClasses();
						this.stage.initPlayer(this.player);
						this.phone();
					}else{
						this.player.update(player);
					}
				}
			},
			setItems : {
				value : function(items) {
					this.items = items;	
					this.frames++;
				}
			},
			
			setupEvents : {
				value : function() {
					$(document).on('keydown', this.keydown.bind(this))
							   .on('keyup', this.keyup.bind(this));
				}
			},
			keydown : {
				value : function(e) {
					for(var i = 0; i < this.classes.length; i++)
						this.classes[i].keydown && this.classes[i].keydown(e.keyCode);
				}
			},
			keyup : {
				value : function(e) {
					for(var i = 0; i < this.classes.length; i++)
						this.classes[i].keyup && this.classes[i].keyup(e.keyCode);
				}
			},
			initClasses : {
				value : function() {
					var cl;
					for(var i = 0; i < this.classes.length; i++){
						cl = this.classes[i];
						cl.initPlayer && cl.initPlayer(this.player);
					}
				}
			},
			initClass : {
				value : function(cl) {
					cl = new cl(this.stage);
					cl.init && cl.init();
					this.classes.push(cl);
		
				}
			},
			draw : {
				value : function () {
					var self = this;
					this.stage.ctx.clearRect(0,0, this.stage.canvas.width, this.stage.canvas.height);
		
					for(var i = 0; i < this.classes.length; i++)
						if(!this.classes[i].isPlayer)
							this.classes[i].draw && this.classes[i].draw(this.player);
		
					if(this.items){
						this.stage.drawTranslated(function() {
		
							self.player.draw();
					self.world.tick();
							for(var i = 0; i < self.items.length; i++){
								self.drawWall(self.items[i]);
								self.drawPlayer(self.items[i]);
							}
							
						});
		
					}
		
					for(var i = 0; i < this.classes.length; i++)
						this.classes[i].drawLast && this.classes[i].drawLast(this.player);
		

					requestAnimationFrame(this.draw.bind(this));
				}
			},
			drawWall : {
				value : function(item) {
					if(!item.id){
						// this.stage.ctx.fillStyle = 'white';
						// if(item.hit)
						// 	this.stage.ctx.fillStyle = 'red';
						this.stage.ctx.fillRect(item.x, item.y, item.w, item.h);	
						
					}
				}
			},
			drawPlayer : {
				value : function(item) {
					var self = this;
					if(item.id && item.id !== this.player.player.id){
						this.stage.rotate(item.angle + 90, item.x, item.y, item.w, item.h, function (x,y,w,h) {
							self.stage.ctx.drawImage(self.playerSprite, x, y,w,h);
						});
					}
				}
			},
			windowResize : {
				value : function() {
					var self = this;
					$(window).resize(function() {
						self.stage.setCanvasSize();
						setTimeout(function() {
							for(var i = 0; i < self.classes.length; i++)
								self.classes[i].resize && self.classes[i].resize();
						}, 0);
					});
		
				}
			},
			phone : {
				value : function() {
					var self = this;
					if (window.DeviceOrientationEvent) {
					    window.addEventListener("deviceorientation", function (event) {
					    	var x = event.beta;  
							var y = event.gamma; 
		
							if (x >  90) { x =  90};
							if (x < -90) { x = -90};
		
							x += 90;
							y += 90;
							var obj = {angle : x, move : y};
		
							if(event.beta){
								io.emit('phone', obj);
								self.player.phoneMove(obj);
								
							}
					    }, true);
					} else if (window.DeviceMotionEvent) {
					    window.addEventListener('devicemotion', function () {
					    	$('.phone-started').text('DeviceMotionEvent');
					    	// io.emit('phone', e);
					    	$('.phone-coords').html(event);
					        // tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
					    }, true);
					} else {
					    window.addEventListener("MozOrientation", function () {
					    	$('.phone-started').text('MozOrientation');
					    	// io.emit('phone', e);
					    	$('.phone-coords').html(orientation);
					        // tilt([orientation.x * 50, orientation.y * 50]);
					    }, true);
					}
					
				}
			}
		})
	return Manager;
});
