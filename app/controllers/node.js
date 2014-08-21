import Ember from 'ember';
import ComponentMixin from '../mixins/component';
import healthToString from '../utils/convert/health-to-string';
import healthToIconClass from '../utils/convert/health-to-icon-class';
import operationalToString from '../utils/convert/operational-to-string';
import operationalToIconClass from '../utils/convert/operational-to-icon-class';

export default Ember.ObjectController.extend(ComponentMixin, {
  needs: ['nodes'],
  isExpanded: false,
  isVmsExpanded: false,
  isActionsVisible: false,
  oses: Ember.computed.filter('controllers.nodes.osCgroups', function(os) {
    return os.get('node.id') === this.get('node.id');
  }),
  cgroups: Ember.computed.filter('controllers.nodes.cgroupCgroups', function(cgroup) {
    return cgroup.get('node.id') === this.get('node.id');
  }),
  aggregateVms: Ember.computed.filter('controllers.nodes.vmsCgroups', function(aggregateVms) {
    return aggregateVms.get('node.id') === this.get('node.id');
  }),
  vms: Ember.computed.filter('controllers.nodes.vms', function(vm) {
    return vm.get('node.id') === this.get('node.id');
  }),
  actions: {
    toggleCollapsed: function(model) {
      if (this.get('isExpanded')) {
        this.transitionToRoute('nodes');
      } else {
        this.transitionToRoute('node', model);
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
