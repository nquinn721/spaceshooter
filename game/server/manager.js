
'use strict';


define('server/manager', [
		'managerBase',
		'grid/grid'
	], function(ManagerBase, Grid) {
		
	function Manager(config) {
		ManagerBase.call(this);
		this.grid = new Grid(config);

	}

	Manager.prototype = Object.create(ManagerBase.prototype, {
		init : {
			value : function() {
			}
		},
		tick : {
			value : function() {
				for(var i = 0; i < this.players.length; i++)
					this.players[i].tick && this.players[i].tick();
			}
		}
	});

	return function(config){
		var manager = new Manager(config);
		return manager;
	}
});