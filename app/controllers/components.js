import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'component',
  nodeCgroups: Ember.computed.filterBy('@this', 'type', 'node'),
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
