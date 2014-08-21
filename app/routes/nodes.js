import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    this.controllerFor('nodes').set('nodes', this.store.find('node'));
    this.controllerFor('nodes').set('vms', this.store.all('vm'));
    return this.store.find('cgroup');
  }
});
