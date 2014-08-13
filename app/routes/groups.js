import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('cgroup');
    /*
    [{
      name: 'clientnode1.hpr.com',
      vms: [{
        name: 'test2-5bf08381-4c24-43e7-a28f-a21519f1d2f4'
      }, {
        name: 'test2-b676257d-418c-46d2-a195-3506d813f4fa'
      }, {
        name: 'test2-cd1079b6-bf38-4660-8459-de6d57022357'
      }]
    }, {
      name: 'clientnode2.hpr.com',
      vms: [{
        name: 'test2-5bf08381-4c24-43e7-a28f-a21519f1d2f4'
      }, {
        name: 'test2-b676257d-418c-46d2-a195-3506d813f4fa'
      }, {
        name: 'test2-cd1079b6-bf38-4660-8459-de6d57022357'
      }]
    }, {
      name: 'clientnode3.hpr.com',
      vms: [{
        name: 'test2-5bf08381-4c24-43e7-a28f-a21519f1d2f4'
      }, {
        name: 'test2-b676257d-418c-46d2-a195-3506d813f4fa'
      }, {
        name: 'test2-cd1079b6-bf38-4660-8459-de6d57022357'
      }]
    }, {
      name: 'clientnode4.hpr.com',
      vms: [{
        name: 'test2-5bf08381-4c24-43e7-a28f-a21519f1d2f4'
      }, {
        name: 'test2-b676257d-418c-46d2-a195-3506d813f4fa'
      }, {
        name: 'test2-cd1079b6-bf38-4660-8459-de6d57022357'
      }]
    }, {
      name: 'clientnode5.hpr.com',
      vms: [{
        name: 'test2-5bf08381-4c24-43e7-a28f-a21519f1d2f4'
      }, {
        name: 'test2-b676257d-418c-46d2-a195-3506d813f4fa'
      }, {
        name: 'test2-cd1079b6-bf38-4660-8459-de6d57022357'
      }]
    }, {
      name: 'clientnode6.hpr.com',
      vms: [{
        name: 'test2-5bf08381-4c24-43e7-a28f-a21519f1d2f4'
      }, {
        name: 'test2-b676257d-418c-46d2-a195-3506d813f4fa'
      }, {
        name: 'test2-cd1079b6-bf38-4660-8459-de6d57022357'
      }]
    }];
    */
  }
});
