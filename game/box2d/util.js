'use strict';
define('box2d/util', function() {
	function Util() {
		
	}

	Util.prototype = Object.create({
		dragNDrop : function() : {
			var self = this;
		    var obj = null;
		    var joint = null;

		    function calculateWorldPosition(e) {
		        return {
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
	});
});