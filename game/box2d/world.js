'use strict';
define('box2d/world', ['box2d/box2d', 'box2d/b2vars', 'box2d/body', 'box2d/b2d'], function(Box2D, b2vars, Body, B2D) {
	function World(world) {
		B2D.call(this);

		this.world = new b2vars.b2World(new b2vars.b2Vec2(0.0, 10.0));
		this.scale = b2vars.scale;
		this.stepAmount = 1/60
	}


	World.prototype = Object.create(B2D.prototype, {
		init : {
			value : function(debugCTX) {
				if(debugCTX)
					this.setupDebugDraw(debugCTX);
				this.setupCollisions();
			}
		},
		box : {
			value : function(obj, owner) {
				return this.create({body : [obj]}, owner);
			}
		},
		create : {
			value : function(obj, owner) {
				return new Body(this.createB2D(obj), owner);
			}
		},
		
		tick : {
			value : function () {
				this.world.Step(1/60, 10, 10);
				if(this.debugCTX)
					this.drawDebug();
				this.world.ClearForces();
			}
		},
		drawDebug : {
			value : function() {
				this.world.DrawDebugData();
			}
		},
		setupDebugDraw : {
			value : function(debugCTX) {
				this.debugCTX = debugCTX;
				
				var debugDraw = new b2vars.b2DebugDraw();
					debugDraw.SetSprite(debugCTX);
					debugDraw.SetDrawScale(30.0);
					debugDraw.SetFillAlpha(0.5);
					debugDraw.SetLineThickness(1.0);
					debugDraw.SetFlags(b2vars.b2DebugDraw.e_shapeBit | b2vars.b2DebugDraw.e_jointBit);
					this.world.SetDebugDraw(debugDraw);
				

			}
		},
		setupCollisions : {
			value : function() {
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
			}
		}
	});
	return World;
});
