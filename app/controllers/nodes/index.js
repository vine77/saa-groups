import Ember from 'ember';
import naturalSort from '../../../bower_components/natural-sort/naturalSort';

export default Ember.ArrayController.extend({
  itemController: 'node',
  sortFunction: naturalSort,
  sortableProperties: [{
    property: 'node.name',
    title: 'Name'
  }, {
    property: 'node.status.operational',
    title: 'Operational status'
  }, {
    property: 'node.status.health',
    title: 'Health status'
  }, {
    property: 'node.utilization.scu_current',
    title: 'SCUs'
  }, {
    property: 'node.contention.system.llc.value',
    title: 'LLC cache contention'
  }, {
    property: 'node.capabilities.memory_size',
    title: 'Memory'
  }],
  sortedProperty: {
    property: 'node.name',
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
