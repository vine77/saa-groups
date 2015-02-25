import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var self = this;
    window.store = this.store;
    window.route = this;
    return Ember.RSVP.allSettled([
      this.store.find('session', 'current_session').then(function() {
        self.controllerFor('login').set('isLoggedIn', true);
        self.controllerFor('login').set('model', self.store.getById('session', 'current_session'));
      }, function() {
        self.controllerFor('login').set('isLoggedIn', false);
        self.store.unloadRecord(self.store.getById('session', 'current_session'));
        self.controllerFor('login').set('model', self.store.createRecord('session', {id: 'current_session'}));
      })
    ]);
  },
  removeCookies: function() {
    Ember.$.removeCookie('auth_pubtkt');
    Ember.$.removeCookie('csrftoken');
    Ember.$.removeCookie('samwebsession');
  },
  actions: {
    logout: function() {
      var self = this;
      this.controllerFor('login').set('isLoggedIn', false);
      this.controllerFor('login').get('model').unloadRecord();
      this.controllerFor('login').set('model', this.store.createRecord('session', {id: 'current_session'}));
      Ember.$.ajax('/api/v3/sessions/current_session.json', {type: 'DELETE'}).always(function() {
        self.removeCookies();
        self.transitionTo('login').then(function() {
          window.location.reload(true);
        });
      });
    }
  }
});
