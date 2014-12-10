import Ember from 'ember';
import ComponentMixin from '../../mixins/component';

export default Ember.ObjectController.extend(ComponentMixin, {

  cores: function() {
    var cores = this.get('capabilities.cores');
    if (Ember.isEmpty(cores)) return Strings.NA;
    return cores + ((cores === 1) ? ' allocated SCU' : ' allocated SCUs');
  }.property('capabilities.cores'),

});
