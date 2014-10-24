import Ember from 'ember';
import ComponentMixin from '../../mixins/component';
import isNonNegativeNumber from '../../utils/is-non-negative-number';

export default Ember.ObjectController.extend(ComponentMixin, {
  socketCorePinningMessage: function() {
    var message = [];
    this.get('utilization.cores.system.used').forEach( function(item, index, enumerable) {
      var itemArray = [];
      if (isNonNegativeNumber(item.socket)) {
        itemArray.push('Socket #' + item.socket);
      }
      if (isNonNegativeNumber(item.core)) {
        itemArray.push('Core #' + item.core);
      }
      if (itemArray.length > 0 ) { message.push(itemArray.join(', ') + '\n'); }
    });
    if (message.length > 0) {
      return message.join('');
    } else {
      return 'Socket and core data was not found';
    }
  }.property('utilization.cores.system.used.@each')
});
