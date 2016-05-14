'use strict';
define('box2d/model', function() {
	
	function Model(obj, parent) {
		this.parent = parent;

		for(var i in obj)this[i] = obj[i];
	}

	Model.prototype = Object.create({
		contact : function(body) {
			// console.log('contact', body, this);
		}
	})
	return Model;
});