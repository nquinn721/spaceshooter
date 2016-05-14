	var path = require('path');

global.requirejs = require('requirejs')
global.define = require('amdefine')(module);

requirejs.config({
    nodeRequire: require,
    baseUrl: path.join(__dirname, 'game')
});

var config = requirejs('grid/config');
module.exports = config;