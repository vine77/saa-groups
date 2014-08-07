import Ember from 'ember';

export default Ember.ObjectController.extend({
  collapsedBox: true,
  isVmsExpanded: false,
  actions: {
    toggleCollapsed: function() {
      this.set('collapsedBox', !this.get('collapsedBox'));
    },
    toggleVmsCollapsed: function() {
      this.set('isVmsExpanded', !this.get('isVmsExpanded'));
    },
  }
});
