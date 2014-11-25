import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    this.controllerFor('nodes').set('nodes', this.store.all('node'));
    this.controllerFor('nodes').set('vms', this.store.all('vm'));
    this.controllerFor('nodes').set('aggregatedItems', this.store.all('cgroup'));
    return this.store.all('cgroup').filterBy('type', 'node');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('nodes').setEach('isVmsExpanded', false);
  }
});
