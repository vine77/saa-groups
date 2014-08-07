import Ember from 'ember';

var Router = Ember.Router.extend({
  location: CoUiENV.locationType
});

Router.map(function() {
  this.route('groups');
});

export default Router;
