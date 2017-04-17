'use strict';
var PugLint = require('pug-lint');
var parse = require('./parse.js');
var webpack_util = require('loader-utils');
var util = require('util');

var linter = new PugLint();
var configured = false;

module.exports = function (content) {
    this.cacheable();
    var config = webpack_util.getOptions(this);

    if(!configured) linter.configure(parse(config));

    var result = linter.checkString(content);
    if(result.length) {
        [this.emitError, this.emitWarning][config.emitError ? 0 : 1](result.sort(function (a, b) {
            var line = a.line - b.line;
            if(line == 0) return (a.column || 0) - (b.column || 0);
            else return line;
        }).map(function (problem) {
            return util.format('    [%s:%s] %s | Rule: %s',
                problem.line,
                problem.column || 0,
                problem.msg,
                problem.code.toLowerCase().replace(/^pug:/, '').replace(/^lint_/, ''));
        }).join('\n'));
    }
    return content
}
