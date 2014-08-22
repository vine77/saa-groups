import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('nodes').setEach('isVmsExpanded', false);
    this.controllerFor('nodes').findBy('id', this.controllerFor('node').get('id')).set('isVmsExpanded', true);
  },
});
