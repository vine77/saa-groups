import Ember from 'ember';

var Router = Ember.Router.extend({
  location: CoUiENV.locationType
});

Router.map(function() {
  this.resource('components', function() {
    this.resource('component', {path: '/:component_id'});
  });
});

export default Router;
