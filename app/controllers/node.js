import Ember from 'ember';
import ComponentMixin from '../mixins/component';
import Mode from '../utils/mappings/mode';

export default Ember.ObjectController.extend(ComponentMixin, {
  needs: ['application', 'nodes/index'],
  isVmsRoute: Ember.computed.equal('controllers.application.currentPath', 'app.nodes.node.vms'),
  isVmsExpanded: false,
  isActionsVisible: false,
  isMonitored: Ember.computed.equal('node.status.mode', Mode.MONITORED),
  isAssuredCoresPhysical: Ember.computed.equal('node.status.mode', Mode.ASSURED_CORES_PHYSICAL),
  actions: {
    toggleActions: function() {
      this.set('isActionsVisible', !this.get('isActionsVisible'));
    }
  }
});
