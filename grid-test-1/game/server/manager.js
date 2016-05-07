'use strict';


define('server/manager', [
		'lib/grid'
	], function(grid) {
		
	function Manager() {
		this.players = [];
		this.npcs = [];
		this.items = [];
	}

	Manager.prototype = {
		init : function(config) {
			this.grid = grid(config);
		},
		createPlayer : function(item) {
			var player = this.grid.createItem(item);
			this.players.push(player);
			return player;
		},
		createNPC : function(item) {
			var npc = this.grid.createItem(item);
			this.npcs.push(npc);
			return npc;
		},
		createItem : function(item) {
			var item = this.grid.createItem(item);
			this.items.push(item);
			return item;
		},
		getPlayersClient :function() {
			return this.players.map(function(p) {

				return p.client();
			});
		},
		removePlayer : function(player) {
			this.players.splice(this.players.indexOf(player), 1);
		}
	}
	return function(config){
		var manager = new Manager;
		manager.init(config);
		return manager;
	}
});