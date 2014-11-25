import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var node = this.store.getById('cgroup', params.node_id);
    if (!node) return this.transitionTo('nodes');  // Redirect if node not found
    return node;
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('oses', this.store.all('cgroup').filterBy('type', 'os').filter(function(item) {
      return item.get('node.id') === model.get('node.id');
    }));
    controller.set('aggregateVms', this.store.all('cgroup').filterBy('type', 'vm').filter(function(item) {
      return item.get('node.id') === model.get('node.id');
    }));
    controller.set('cgroups', this.store.all('cgroup').filter(function(item) {
      var type = item.get('type');
      return type !== 'node' && type !== 'os' && type !== 'vm' && type !== 'vms';
    }).filter(function(item) {
      return item.get('node.id') === model.get('node.id');
    }));
    return controller.set('vms', this.store.filter('vm', {
      'node_id': model.get('node.id')
    }, function(vm) {
      return vm.get('node.id') === model.get('node.id');
    }));
  },
  actions: {
    goToNodes: function() {
      this.transitionTo('nodes');
    }
  }
});
