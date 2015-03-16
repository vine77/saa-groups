import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  capabilities: DS.attr(),
  contention: DS.attr(),
  floatingIps: DS.attr(),
  fixedIps: DS.attr(),
  macs: DS.attr(),
  name: DS.attr('string'),
  nodeName: DS.attr('string'),
  slaName: DS.attr('string'),
  status: DS.attr(),
  utilization: DS.attr(),
  tenantName: DS.attr('string'),

  // Computed properties
  scuTotal: function() {
    return this.get('utilization.scu.compute') + this.get('utilization.scu.io_wait') + this.get('utilization.scu.misc');
  }.property('utilization.scu.compute', 'utilization.scu.io_wait', 'utilization.scu.misc'),

  // Computed properties for sorting
  state: function() {
    return this.get('status.health') + '.' + this.get('status.operational');
  }.property('status.health', 'status.operational'),
  noisy: function() {
    return this.get('status.victim') + '.' + this.get('status.aggressor');
  }.property('status.victim', 'status.aggressor'),

  // Self-referential relationships
  aggressors: DS.hasMany('vm', {async: true, inverse: null}),
  victims: DS.hasMany('vm', {async: true, inverse: null}),

  // Relationships
  node: DS.belongsTo('node'),
  //sla: DS.belongsTo('sla'),
  //vmInstantiationDetailed: DS.belongsTo('vmInstantiationDetailed'),
  //vmInstantiationSimple: DS.belongsTo('vmInstantiationSimple'),
  //vmTrustReport: DS.belongsTo('vmTrustReport'),
  tenant: DS.belongsTo('tenant', {async: true})
});
