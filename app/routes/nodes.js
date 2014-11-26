import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    this.controllerFor('nodes').set('nodes', this.store.all('node'));
    this.controllerFor('nodes').set('vms', this.store.all('vm'));
    this.controllerFor('nodes').set('aggregatedItems', this.store.all('cgroup'));
    return this.store.all('cgroup').filterBy('type', 'node');
  },
  actions: {
    goToNode: function(model) {
      this.transitionTo('node', model);
    }
  }
});
