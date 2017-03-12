'use strict';
var path = require('path');
var util = require('util');

module.exports = function configParser(config) {
    if (config.extends) {
        var configPath = path.resolve(util.format('node_modules/%s', config.extends), 'index.js');

        try {
            var defaultConfig = require(configPath);
            delete config.extends;
            return Object.assign(defaultConfig, config);
        } catch (e) {
        }
    }
    return config;
};