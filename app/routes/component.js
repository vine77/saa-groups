import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('components').setEach('isExpanded', false);
    this.controllerFor('components').findBy('id', model.get('id')).set('isExpanded', true);
  },
  model: function(params) {
    return this.store.find('cgroup', params.component_id);
  }
});
