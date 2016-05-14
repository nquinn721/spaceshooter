'use strict';


define('managerBase', [
		'base',
		'box2d/world'
	], function(BaseClass, World) {

	function ManagerBase() {
		this.world = new World;
		this.players = [];
		this.npcs = [];
		this.items = [];
		this.minimap = [];
		
	}

	ManagerBase.prototype = Object.create(BaseClass.prototype, {

		createItem : {
			value : function(type, item) {

				item.body = this.world.box({
					id : type + this[type + 's'].length,
					x : item.x,
					y : item.y,
					w : item.w,
					h : item.h
				});
				this[type + 's'].push(item);
				return item;
			}
		},
		removePlayer : {
			value : function(player) {
				if(typeof player === 'object')
					this.players.splice(this.players.indexOf(player), 1);
				else this.removePlayer(this.findPlayerById(player));
			}
		},
		findPlayerById : {
			value : function(id) {
				for(var i = 0; i < this.players.length; i++)
					if(this.players[i].id === id)return {player : this.players[i], index : i};
			}
		}
	});
	return ManagerBase;
});