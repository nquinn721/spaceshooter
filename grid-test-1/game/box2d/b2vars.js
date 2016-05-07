'use strict';
define('box2d/b2vars', ['box2d/box2d'], function(Box2D) {
	return {
		scale : 30,

		/**
		 * box2d
		 */ 
		b2Vec2 :  Box2D.Common.Math.b2Vec2,
		math : Box2D.Common.Math,
		b2BodyDef :  Box2D.Dynamics.b2BodyDef,
		b2Body :  Box2D.Dynamics.b2Body,
		b2FixtureDef :  Box2D.Dynamics.b2FixtureDef,
		b2Fixture :  Box2D.Dynamics.b2Fixture,
		b2World :  Box2D.Dynamics.b2World,
		b2MassData :  Box2D.Collision.Shapes.b2MassData,
		b2PolygonShape :  Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape :  Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw :  Box2D.Dynamics.b2DebugDraw,
		b2ContactListener : Box2D.Dynamics.b2ContactListener,
		/**
			JOINTS
		*/
		b2DistanceJoint : Box2D.Dynamics.Joints.b2DistanceJoint,
		b2DistanceJointDef : Box2D.Dynamics.Joints.b2DistanceJointDef,
		b2FrictionJoint : Box2D.Dynamics.Joints.b2FrictionJoint,
		b2FrictionJointDef : Box2D.Dynamics.Joints.b2FrictionJointDef,
		b2GearJoint : Box2D.Dynamics.Joints.b2GearJoint,
		b2GearJointDef : Box2D.Dynamics.Joints.b2GearJointDef,
		b2Jacobian : Box2D.Dynamics.Joints.b2Jacobian,
		b2Joint : Box2D.Dynamics.Joints.b2Joint,
		b2JointDef : Box2D.Dynamics.Joints.b2JointDef,
		b2JointEdge : Box2D.Dynamics.Joints.b2JointEdge,
		b2LineJoint : Box2D.Dynamics.Joints.b2LineJoint,
		b2LineJointDef : Box2D.Dynamics.Joints.b2LineJointDef,
		b2MouseJoint : Box2D.Dynamics.Joints.b2MouseJoint,
		b2MouseJointDef : Box2D.Dynamics.Joints.b2MouseJointDef,
		b2PrismaticJoint : Box2D.Dynamics.Joints.b2PrismaticJoint,
		b2PrismaticJointDef : Box2D.Dynamics.Joints.b2PrismaticJointDef,
		b2PulleyJoint : Box2D.Dynamics.Joints.b2PulleyJoint,
		b2PulleyJointDef : Box2D.Dynamics.Joints.b2PulleyJointDef,
		b2RevoluteJoint : Box2D.Dynamics.Joints.b2RevoluteJoint,
		b2RevoluteJointDef : Box2D.Dynamics.Joints.b2RevoluteJointDef,
		b2WeldJoint : Box2D.Dynamics.Joints.b2WeldJoint,
		b2WeldJointDef : Box2D.Dynamics.Joints.b2WeldJointDef
	}
});