import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('app', function() {
    this.resource('nodes', function() {
      this.resource('node', {path: '/:node_id'}, function() {
        this.route('vms');
      });
    });
  });
});

export default Router;
