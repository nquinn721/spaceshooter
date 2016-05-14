'use strict';

if(typeof require !== 'undefined'){
	var EventEmitter = require('events');
}

define('base', function() {
	function Base() {
		EventEmitter.apply(this);
	}
	Base.prototype = Object.create(EventEmitter.prototype, {
		plain : {
			value : function () {
				var obj = {};
				for(var i in this)
					if(typeof i !== 'function' && this.hasOwnProperty(i))obj[i] = this[i];
				return obj;
			}
		}
	});
	return Base;
})