'use strict';
define('box2d/world', ['box2d/b2vars'], function(b2vars) {
	var debug = document.getElementById('debug');
	
	function World(world) {
		this.world = new b2vars.b2World(new b2vars.b2Vec2(0.0, 10.0));
		this.scale = b2vars.scale;
		this.stepAmount = 1/60
	}


	World.prototype = {
		init : function() {
			this.debugDraw();
			this.setupCollisions();
			this.dragNDrop();
			this.tick();	
		},
		createFixture : function(fixture) {
			fixture = this.world.CreateFixture(fixture);
			return fixture;
		},
		createBody : function(body) {
			body = this.world.CreateBody(body);
			return body;
		},
		tick : function () {
			this.world.DrawDebugData();
			this.world.Step(1/60, 10, 10);
			this.world.ClearForces();
			requestAnimationFrame(this.tick.bind(this));			
		},
		debugDraw : function() {
			// Setup debug draw
			var debugDraw = new b2vars.b2DebugDraw();
			debugDraw.SetSprite(debug.getContext('2d'));
			debugDraw.SetDrawScale(b2vars.scale);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			this.world.SetDebugDraw(debugDraw);

		},
		setupCollisions : function() {
			this.listener = new b2vars.b2ContactListener();
		    // this.listener.PostSolve = function (contact, impulse) {
		    this.listener.BeginContact = function (contact, impulse) {
		        var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
		        	fixtureA = contact.GetFixtureA().GetUserData(),
		            bodyB = contact.GetFixtureB().GetBody().GetUserData(),
		        	fixtureB = contact.GetFixtureA().GetUserData();

		        if (bodyA.contact) 
		            bodyA.contact(bodyB, fixtureA, contact, impulse)
		        if (bodyB.contact) 
		            bodyB.contact(bodyA, fixtureB, contact, impulse)
		        if(fixtureA.contact)
		        	fixtureA.contact(fixtureB, bodyA);
		        if(fixtureB.contact)
		        	fixtureB.contact(fixtureA, bodyB);

		    };
		    this.world.SetContactListener(this.listener);	
		},
		dragNDrop : function() {
			var self = this;
		    var obj = null;
		    var joint = null;

		    function calculateWorldPosition(e) {
		        return point = {
		            x: (e.offsetX || e.layerX) / self.scale,
		            y: (e.offsetY || e.layerY) / self.scale
		        };
		    }

		    debug.addEventListener("mousedown", function (e) {
		        e.preventDefault();
		        var point = calculateWorldPosition(e);
		        self.world.QueryPoint(function (fixture) {
		            obj = fixture.GetBody();
		            console.log(obj);
		        }, point);
		    });

		    debug.addEventListener("mousemove", function (e) {
		        if (!obj) {
		            return;
		        }
		        var point = calculateWorldPosition(e);

		        if (!joint) {
		            var jointDefinition = new b2vars.b2MouseJointDef();

		            jointDefinition.bodyA = self.world.GetGroundBody();
		            jointDefinition.bodyB = obj;
		            jointDefinition.target.Set(point.x, point.y);
		            jointDefinition.maxForce = 100000;
		            jointDefinition.timeStep = self.stepAmount;
		            joint = self.world.CreateJoint(jointDefinition);
		        }

		        joint.SetTarget(new b2vars.b2Vec2(point.x, point.y));
		    });

		    debug.addEventListener("mouseup", function (e) {
		        obj = null;
		        if (joint) {
		            self.world.DestroyJoint(joint);
		            joint = null;
		        }
		    });
		}
	}


	var world = new World;

	world.init();
	return world;
});
