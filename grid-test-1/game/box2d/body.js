'use strict';
define('box2d/body', ['box2d/model', 'box2d/b2vars', 'box2d/b2d'], function(Model, b2vars, b2d) {
	function Body(obj, owner) {
		console.log(owner);
		var elements = [];
		for(var i = 0; i < obj.body.length; i++)
			elements.push(new Model(obj.body[i]));

		obj.body = elements;
		obj.contact = this.contact;

		elements = b2d.create(obj);
		this.body = elements.body;
		this.joints = elements.joints;

		this.owner = owner;
	}

	Body.prototype = {
		contact : function(contact, fixture) {
			console.log(this);
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
			var position = this.getPosition(body);
			position.x = (position.x + x) / SCALE;
			position.y = (position.y + y) / SCALE;
			this.body.SetPosition(position);
		},
		getPosition : function() {
			var position = this.body.GetPosition();
			position.y *= SCALE;
			position.x *= SCALE;
			return position;
		},
		getX : function() {
			return this.getRealX() / SCALE;
		},
		getY : function() {
			return this.getRealY() / SCALE;
		},
		getRealX : function() {
			return this.body.GetPosition().y;
		},
		getRealY : function() {
			return this.body.GetPosition().y;
		}
	}
	return Body;
});