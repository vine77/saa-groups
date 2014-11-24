import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('nodes').setEach('isExpanded', false);
    this.controllerFor('nodes').findBy('id', model.get('id')).set('isExpanded', true);
  },
  model: function(params) {
    var node = this.store.getById('cgroup', params.node_id);
    if (!node) return this.transitionTo('nodes');  // Redirect if node not found
    return node;
  },
  afterModel: function(node) {
    Ember.run.later(this, function() {
      this.store.find('vm', {'node_id': node.get('id')});
    }, 50);
  }
});
