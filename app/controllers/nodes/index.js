import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'node',
  sortableProperties: [{
    property: 'name',
    title: 'Name'
  }, {
    property: 'status.operational',
    title: 'Operational status'
  }, {
    property: 'status.health',
    title: 'Health status'
  }, {
    property: 'utilization.scu_current',
    title: 'SCUs'
  }, {
    property: 'contention.system.llc.value',
    title: 'LLC cache contention'
  }, {
    property: 'capabilities.memory_size',
    title: 'Memory'
  }],
  sortedProperty: {
    property: 'name',
    title: 'Name'
  },
  sortProperties: function() {
    return [this.get('sortedProperty.property')];
  }.property('sortedProperty'),
  aggregatedOses: Ember.computed.filterBy('aggregatedItems', 'type', 'os'),
  aggregatedVms: Ember.computed.filterBy('aggregatedItems', 'type', 'vm'),
  aggregatedCgroups: Ember.computed.filter('aggregatedItems', function(cgroup) {
    var type = cgroup.get('type');
    return type !== 'node' && type !== 'os' && type !== 'vm' && type !== 'vms';
  }),
  actions: {
    toggleAscending: function() {
      this.set('sortAscending', !this.get('sortAscending'));
    },
    setSortedProperty: function(property) {
      this.set('sortedProperty', property);
    }
  }
});
