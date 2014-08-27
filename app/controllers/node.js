import Ember from 'ember';
import ComponentMixin from '../mixins/component';
import Mode from '../utils/mappings/mode';

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
  isAssuredCoresPhysical: Ember.computed.equal('node.status.mode', Mode.ASSURED_CORES_PHYSICAL),
  actions: {
    toggleActions: function() {
      this.set('isActionsVisible', !this.get('isActionsVisible'));
    }
  }
});
