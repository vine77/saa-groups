import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    this.controllerFor('nodes').set('nodes', this.store.find('node'));
    this.controllerFor('nodes').set('vms', this.store.all('vm'));
    return this.store.find('cgroup');
  },
  actions: {
    toggleCollapsed: function(model) {
      var node = this.controllerFor('nodes').findBy('id', model.get('id'));
      if (node.get('isExpanded')) {
        this.transitionTo('nodes');
      } else {
        this.transitionTo('node', model);
      }
    },
    toggleVmsCollapsed: function(model) {
      var node = this.controllerFor('nodes').findBy('id', model.get('id'));
      if (node.get('isVmsExpanded')) {
        this.transitionTo('node', model);
      } else {
        this.transitionTo('node.vms');
      }
    }
  }
});
