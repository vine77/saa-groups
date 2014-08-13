import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    // Development helpers
    window.route = this;
    window.store = this.store;
  }
});
