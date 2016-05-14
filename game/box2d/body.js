'use strict';
define('box2d/body', ['box2d/b2vars'], function(b2vars) {
	function Body(body, owner) {
		this.body = body;
		this.owner = owner;
	}

	Body.prototype = Object.create({
			contact : function(contact, fixture) {
				if(this.owner)this.owner.contact(contact, fixture, contact, impulse);
			},
			setLinearVelocity : function(x, y) {
				this.body.SetLinearVelocity(new b2vars.b2Vec2(x || 0, y || 0));
			},
			applyForce : function(x, y) {
				this.body.ApplyForce(new b2vars.b2Vec2(x || 0, y || 0), this.body.GetWorldCenter());	
			},
			applyImpulse : function(x, y) {
				console.log('apply impulse');
				this.body.ApplyImpulse(new b2vars.b2Vec2(x || 0, y || 0), this.body.GetWorldCenter());	
			},
			setPosition : function(x, y) {
				this.body.SetPosition(new b2vars.b2Vec2(x / b2vars.scale, y / b2vars.scale));
			},
			getPosition : function() {
				var position = this.body.GetPosition(),
					obj = {
						x : position.x,
						y : position.y
					};

				obj.y *= b2vars.scale;
				obj.x *= b2vars.scale;
				return obj;
			},
			getX : function() {
				return this.getRealX() * b2vars.scale;
			},
			getY : function() {
				return this.getRealY() * b2vars.scale;
			},
			getRealX : function() {
				return this.body.GetPosition().x;
			},
			getRealY : function() {
				return this.body.GetPosition().y;
			}
		})
	return Body;
});