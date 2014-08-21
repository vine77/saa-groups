import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    console.log('enter VMs');
    this._super(controller, model);
    this.controllerFor('nodes').setEach('isVmsExpanded', false);
    this.controllerFor('nodes').findBy('id', this.controllerFor('component').get('id')).set('isVmsExpanded', true);
  },
});
