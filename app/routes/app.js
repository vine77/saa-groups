import Ember from 'ember';
import authenticatedRoute from './authenticated';

export default authenticatedRoute.extend({
  refreshInterval: 60, // in seconds
  model: function() {
    return this.loadModels();
  },
  afterModel: function() {
    Ember.run.later(this, 'reloadModels', this.refreshInterval * 1000);
  },
  loadModels: function() {
    return Ember.RSVP.all([
      this.store.find('node'),
      this.store.find('cgroup'),
      this.store.find('tenant')
    ]);
  },
  reloadModels: function() {
    Ember.run.later(this, 'reloadModels', this.refreshInterval * 1000);
    var isAppRoute = this.controllerFor('application').get('currentPath').split('.')[0] === 'app';
    var isLoggedIn = this.controllerFor('login').get('isLoggedIn');
    if (isAppRoute && isLoggedIn) this.loadModels();
  }
});
