import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  enabled: DS.attr('boolean'),

  // Relationships
  nodes: DS.hasMany('node', {async: true}),
  vms: DS.hasMany('vm', {async: true})
});
