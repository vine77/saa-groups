import Ember from 'ember';

var Router = Ember.Router.extend({
  location: CoUiENV.locationType
});

Router.map(function() {
  this.resource('nodes', function() {
    this.resource('node', {path: '/:node_id'});
  });
});

export default Router;
