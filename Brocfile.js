/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var app = new EmberApp();

var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var trees = [];

app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/pnotify/pnotify.js');
app.import('bower_components/jquery-cookie/jquery.cookie.js');
app.import('bower_components/jquery-idletimer/dist/idle-timer.js');
//app.import('bower_components/d3/d3.js');
//app.import('bower_components/crossfilter/crossfilter.js');

trees.push(pickFiles('bower_components', {
  srcDir: '/fontawesome/fonts',
  files: ['*.woff', '*.ttf', '*.svg', '*.eot'],
  destDir: '/fonts'
}));

trees.push(pickFiles('bower_components', {
  srcDir: '/bootstrap/fonts',
  files: ['*.woff', '*.ttf', '*.svg', '*.eot'],
  destDir: '/fonts'
}));

trees.push(app.toTree());
tree = mergeTrees(trees);

module.exports = tree;
