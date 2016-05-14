'use strict';
define('box2d/b2d', ['box2d/b2vars'], function(b2vars) {
	function B2D() {
	}

	B2D.prototype = Object.create({
			
			createB2D : function(obj) {
				this.mergeWithConfig(obj);
	
				if(obj.body)
					return this.createBodyMultipleFixtures(obj);
	
				if(obj.bodies)
					return this.createBodies(obj);
				
			},
			createBodies : function(obj) {
				var bodies = [];
	
				for(var i = 0; i < obj.bodies.length; i++){
	
					var bodyDef = this.body(obj.bodies[i]),
						fixtureDef = this.fixture(obj.bodies[i]),
						body = this.world.CreateBody(bodyDef);
			
					bodies.push(this.createBody(body, fixtureDef));
				}
				return {bodies : bodies};
				
			},
			createBodyMultipleFixtures : function(obj) {
				var bodyDef = this.body(obj.body[0], obj);
	
				this.fixtures = [];
	
				for(var i = 0; i < obj.body.length; i++){
					var body = obj.body[i];
	
					this.fixtures.push(
						this.fixture(
							body, 
							i > 0 && body.type === 'dynamic' ? true : false
						)
					);
				}
				
				var body = this.world.CreateBody(bodyDef);
				for(var i = 0; i < this.fixtures.length; i++)
					this.createBody(body, this.fixtures[i]);
				return body;	
			},
			mergeWithConfig : function(obj) {
				if(obj.config && (obj.config.body || obj.config.bodies)){
					var bodies = obj.body || obj.bodies,
						config = obj.config.body || obj.config.bodies;
	
					for(var i = 0; i < bodies.length; i++)
						for(var j in config)
							if(!bodies[i][j])
								bodies[i][j] = config[j];
				}
			},
			body : function(obj, entireObj) {
				var bodyDef = new b2vars.b2BodyDef();
				bodyDef.type = b2vars.b2Body[obj.type ? 'b2_' + obj.type + 'Body' : 'b2_staticBody'];
				bodyDef.userData = entireObj || obj;
				bodyDef.position.x = (obj.x || 50) / b2vars.scale;
				bodyDef.position.y = (obj.y  || 50) / b2vars.scale;
				
				if(obj.fixedRotation)
					bodyDef.fixedRotation = true;
	
				return bodyDef;
			},
			fixture : function(obj, oriented) {
				var fixDef = new b2vars.b2FixtureDef();
				fixDef.density = obj.density || 1;
				fixDef.friction = obj.friction || 0.5;
				fixDef.x = obj.x;
				fixDef.y = obj.y;
				fixDef.userData = obj;
				
				if(obj.shape === 'circle'){
		    		fixDef.shape = new b2vars.b2CircleShape(obj.r / b2vars.scale || 5 / b2vars.scale);
				}else{
					fixDef.shape = new b2vars.b2PolygonShape();
					if(!oriented)
						fixDef.shape.SetAsBox((obj.w / 2 || 20) / b2vars.scale, (obj.h / 2 || 20) / b2vars.scale);
					else{
						fixDef.shape.SetAsOrientedBox(
							(obj.w / 2 || 20) / b2vars.scale, 
							(obj.h / 2 || 20) / b2vars.scale, 
							new b2vars.b2Vec2(
								obj.x / b2vars.scale, 
								obj.y / b2vars.scale
							), 
							0);
					}
				}
				return fixDef;
			},
			joint : function(obj, body1, body2) {
				var joint = new b2vars.window['b2' + (obj.joint.substr(0,1).toUpperCase() + obj.joint.substr(1)) + 'JointDef']();
			    joint.Initialize(body1, body2, body1.GetWorldCenter(), body2.GetWorldCenter());
	
			    if(obj.jointCollide)
					joint.collideConnected = true;
				if(obj.distance)
			    	joint.length = obj.distance;
			    if(obj.frequencyHz)
			    	joint.frequencyHz = obj.frequencyHz;
			    if(obj.dampingRatio)
			    	joint.dampingRatio = obj.dampingRatio;
	
			    this.CreateJoint(joint);
			    return joint;
			},
			getBody : function(bodies, id) {
				for(var i = 0; i < bodies.length; i++){
					var body = bodies[i].GetUserData();
	
					if(body.id === id)return bodies[i];
				}
			},
			createBody : function(body, fixDef) {
				body.CreateFixture(fixDef);
			}
		})

	return B2D;
});