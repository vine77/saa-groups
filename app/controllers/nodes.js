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
  nodeCgroups: Ember.computed.filterBy('@this', 'type', 'node'),
  osCgroups: Ember.computed.filterBy('@this', 'type', 'os'),
  vmsCgroups: Ember.computed.filterBy('@this', 'type', 'vm'),
  cgroupCgroups: Ember.computed.filter('@this', function(cgroup) {
    var type = cgroup.get('type');
    return type !== 'node' && type !== 'os' && type !== 'vm' && type !== 'vms';
  }),
  firstColumnNodes: function() {
    return this.get('nodeCgroups').filter(function(item, index, enumerable) {
      //return index < (enumerable.get('length') / 2);
      return index % 2 === 0;
    });
  }.property('nodeCgroups.@each'),
  secondColumnNodes: function() {
    return this.get('nodeCgroups').filter(function(item, index, enumerable) {
      //return index >= (enumerable.get('length') / 2);
      return index % 2 !== 0;
    });
  }.property('nodeCgroups.@each')
});
