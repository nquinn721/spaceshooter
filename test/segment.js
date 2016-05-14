'use strict';

var config = require('./requirejs-config');
var grid = requirejs('grid')(config);
var expect = require('chai').expect;


describe('Segment Class', function() {
	var item1 = {x : 110, y : 110, w : 10, h : 10, segmentAreaType : '3x3'},
		item2 = {x : 110, y : 50, w : 10, h : 10, segmentAreaType : '3x3'},
		item3 = {x : 110, y : 115, w : 10, h : 10, segmentAreaType : '3x3'};
		item1 = grid.createItem(item1);
		item2 = grid.createItem(item2);
		item3 = grid.createItem(item3);


	
});