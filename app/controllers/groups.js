import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'group',
  firstColumnNodes: function() {
    return this.filter(function(item, index, enumerable) {
      //return index < (enumerable.get('length') / 2);
      return index % 2 === 0;
    });
  }.property('@each'),
  secondColumnNodes: function() {
    return this.filter(function(item, index, enumerable) {
      //return index >= (enumerable.get('length') / 2);
      return index % 2 !== 0;
    });
  }.property('@each')
});
