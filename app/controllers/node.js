import Ember from 'ember';
import ComponentMixin from '../mixins/component';
import Mode from '../utils/mappings/mode';

export default Ember.ObjectController.extend(ComponentMixin, {
  needs: ['nodes/index'],
  isVmsExpanded: false,
  isActionsVisible: false,
  isAssuredCoresPhysical: Ember.computed.equal('node.status.mode', Mode.ASSURED_CORES_PHYSICAL),
  actions: {
    toggleActions: function() {
      this.set('isActionsVisible', !this.get('isActionsVisible'));
    }
  }
});
