import Ember from 'ember';

export default Ember.ObjectController.extend({
  isExpanded: true,
  isVmsExpanded: false,
  isActionsVisible: false,
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
