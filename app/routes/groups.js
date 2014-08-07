import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [{
      name: 'clientnode1.hpr.com'
    }, {
      name: 'clientnode2.hpr.com'
    }, {
      name: 'clientnode3.hpr.com'
    }, {
      name: 'clientnode4.hpr.com'
    }, {
      name: 'clientnode5.hpr.com'
    }, {
      name: 'clientnode6.hpr.com'
    }];
  }
});
