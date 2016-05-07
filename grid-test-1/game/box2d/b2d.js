'use strict';
define('box2d/b2d', ['box2d/b2vars'], function(b2vars) {
	function B2D() {
		
	}

	B2D.prototype = {

		create : function(obj) {
			this.mergeWithConfig(obj);

			if(obj.body)
				return this.createBodyMultipleFixtures(obj);

			if(obj.bodies)
				return this.createBodies(obj);


			



			// if(obj.joints){
			// 	for(var i = 0; i < obj.joints.length; i++){
			// 		var jointConfig = obj.joints[i],
			// 			jointIds = jointConfig.connects.split(' '),
			// 			body1 = this.getBody(bodies, jointIds[0]),
			// 			body2 = this.getBody(bodies, jointIds[1]),
			// 			joint = this.joint(jointConfig, body1, body2);
			// 		joints.push(joint);
			// 	}
			// }

			
		},
		createBodies : function(obj) {
			var bodies = [];

			for(var i = 0; i < obj.bodies.length; i++){

				var bodyDef = this.body(obj.bodies[i]),
					fixtureDef = this.fixture(obj.bodies[i]),
					body = world.createBody(bodyDef);

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
			
			var body = world.createBody(bodyDef);
			for(var i = 0; i < this.fixtures.length; i++)
				this.createBody(body, this.fixtures[i]);

			return {body : body};	
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
			var bodyDef = new b2BodyDef();
			bodyDef.type = b2Body[obj.type ? 'b2_' + obj.type + 'Body' : 'b2_staticBody'];
			bodyDef.userData = entireObj || obj;
			bodyDef.position.x = (obj.x + (obj.w / 2) || 50) / b2vars.scale;
			bodyDef.position.y = ((obj.y + (obj.h / 2)) || 50) / b2vars.scale;
			
			if(obj.fixedRotation)
				bodyDef.fixedRotation = true;

			return bodyDef;
		},
		fixture : function(obj, oriented) {
			var fixDef = new b2FixtureDef();
			fixDef.density = obj.density || 1;
			fixDef.friction = obj.friction || 0.5;
			fixDef.x = obj.x;
			fixDef.y = obj.y;
			fixDef.userData = obj;
			
			if(obj.shape === 'circle'){
	    		fixDef.shape = new b2CircleShape(obj.r / b2vars.scale || 5 / b2vars.scale);
			}else{
				fixDef.shape = new b2PolygonShape();
				if(!oriented)
					fixDef.shape.SetAsBox((obj.w / 2 || 20) / b2vars.scale, (obj.h / 2 || 20) / b2vars.scale);
				else{
					fixDef.shape.SetAsOrientedBox(
						(obj.w / 2 || 20) / b2vars.scale, 
						(obj.h / 2 || 20) / b2vars.scale, 
						new b2Vec2(
							obj.x / b2vars.scale, 
							obj.y / b2vars.scale
						), 
						0);
				}
			}
			return fixDef;
		},
		joint : function(obj, body1, body2) {
			var joint = new window['b2' + (obj.joint.substr(0,1).toUpperCase() + obj.joint.substr(1)) + 'JointDef']();
		    joint.Initialize(body1, body2, body1.GetWorldCenter(), body2.GetWorldCenter());

		    if(obj.jointCollide)
				joint.collideConnected = true;
			if(obj.distance)
		    	joint.length = obj.distance;
		    if(obj.frequencyHz)
		    	joint.frequencyHz = obj.frequencyHz;
		    if(obj.dampingRatio)
		    	joint.dampingRatio = obj.dampingRatio;

		    world.CreateJoint(joint);
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
	}

	var b2d = new B2D;
	return b2d;
});