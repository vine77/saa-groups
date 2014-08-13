import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr(),
  contention: DS.attr(),
  utilization: DS.attr(),
  capabilities: DS.attr(),
  nodeName: DS.attr('string'),
  type: DS.attr('string'),

  // Relationships
  node: DS.belongsTo('node')

});
