import Ember from 'ember';
import naturalSort from '../../../bower_components/natural-sort/naturalSort';

export default Ember.ArrayController.extend({
  needs: ['nodes'],
  itemController: 'node',
  sortFunction: naturalSort,
  sortableProperties: [{
    title: 'Name',
    property: 'nodeName',
    sortAscending: true
  }, {
    title: 'VM Count',
    property: 'node.vmInfo.count',
    sortAscending: false
  }, {
    title: 'Operational Status',
    property: 'status.operational',
    sortAscending: false
  }, {
    title: 'Health Status',
    property: 'status.health',
    sortAscending: false
  }, {
    title: 'SCU Utilization',
    property: 'utilization.scu_current',
    sortAscending: false
  }, {
    title: 'LLC Cache Contention',
    property: 'contention.system.llc.value',
    sortAscending: false
  }, {
    title: 'Memory Used',
    property: 'utilization.memory',
    sortAscending: false
  }, {
    title: 'RAM',
    property: 'capabilities.memory_size',
    sortAscending: false
  }],
  sortedProperty: {
    title: 'Name',
    property: 'nodeName',
    sortAscending: true
  },
  sortProperties: function() {
    return [this.get('sortedProperty.property')];
  }.property('sortedProperty'),
  isMatch: function(item) {
    var node = item.get('node');
    if (!this.get('selectedTenant')) return true;
    if (Ember.isEmpty(node.get('tenants'))) return false;
    return node.get('tenants').contains(this.get('selectedTenant'));
  },
  filteredContent: function() {
    return this.get('arrangedContent').filter(function(item) {
      return this.get('isMatch').apply(this, [item]);
    }, this);
  }.property('arrangedContent', 'selectedTenant', 'sortAscending'),
  sortAscending: Ember.computed.alias('sortedProperty.sortAscending'),
  aggregatedOses: Ember.computed.filterBy('aggregatedItems', 'type', 'os'),
  aggregatedVms: Ember.computed.filterBy('aggregatedItems', 'type', 'vm'),
  aggregatedCgroups: Ember.computed.filter('aggregatedItems', function(cgroup) {
    var type = cgroup.get('type');
    return type !== 'node' && type !== 'os' && type !== 'vm' && type !== 'vms';
  }),
  tenants: Ember.computed.alias('controllers.nodes.tenants'),
  selectedTenant: null,
  actions: {
    toggleAscending: function() {
      this.set('sortAscending', !this.get('sortAscending'));
    },
    setSortedProperty: function(property) {
      this.set('sortedProperty', property);
    }
  }
});
