import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['components'],
  isExpanded: false,
  isVmsExpanded: false,
  isActionsVisible: false,
  oses: Ember.computed.filter('controllers.components.osCgroups', function(os) {
    return os.get('node.id') === this.get('node.id');
  }),
  cgroups: Ember.computed.filter('controllers.components.cgroupCgroups', function(cgroup) {
    return cgroup.get('node.id') === this.get('node.id');
  }),
  aggregateVms: Ember.computed.filter('controllers.components.vmsCgroups', function(aggregateVms) {
    return aggregateVms.get('node.id') === this.get('node.id');
  }),
  vms: Ember.computed.filter('controllers.components.vms', function(vm) {
    return vm.get('node.id') === this.get('node.id');
  }),
  actions: {
    toggleCollapsed: function(model) {
      if (this.get('isExpanded')) {
        this.transitionToRoute('components');
      } else {
        this.transitionToRoute('component', model);
      }
    },
    toggleVmsCollapsed: function() {
      this.set('isVmsExpanded', !this.get('isVmsExpanded'));
    },
    toggleActions: function() {
      this.set('isActionsVisible', !this.get('isActionsVisible'));
    }
  }
});
