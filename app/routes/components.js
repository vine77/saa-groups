import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    this.controllerFor('components').set('nodes', this.store.find('node'));
    this.controllerFor('components').set('vms', this.store.all('vm'));
    return this.store.find('cgroup');
  }
});
