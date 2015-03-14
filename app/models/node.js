import Ember from 'ember';
import DS from 'ember-data';
import Mode from '../utils/mappings/mode';

export default DS.Model.extend({
  capabilities: DS.attr(),
  cloudServices: DS.attr(),
  contention: DS.attr(),
  ids: DS.attr(),
  name: DS.attr('string'),
  schedulerMark: DS.attr('number'),
  schedulerPersistent: DS.attr('boolean'),
  status: DS.attr(),
  tier: DS.attr('string'),
  utilization: DS.attr(),
  vmInfo: DS.attr(),

  samControlled: Ember.computed.alias('status.mode'),  // 0: Not under SAA control (agent not installed), 1: SAA monitored, 2: SAA assured (can place SLA VMs on node)
  memory: Ember.computed.alias('utilization.cloud.memory'),
  vcpus: Ember.computed.alias('utilization.cloud.vcpus'),

  // Computed properties
  scuTotal: function() {
    return this.get('utilization.scu.system.compute') + this.get('utilization.scu.system.io_wait') + this.get('utilization.scu.system.misc');
  }.property('utilization.scu.system.compute', 'utilization.scu.system.io_wait', 'utilization.scu.system.misc'),
  isAssured: function() {
    return this.get('samControlled') == App.ASSURED_SCU_VCPU ||
      this.get('samControlled') == App.ASSURED_SCU_VM ||
      this.get('samControlled') == App.ASSURED_CORES_PHYSICAL;
  }.property('samControlled'),
  samRegistered: function() {
    return this.get('status.mode') === Mode.MONITORED || this.get('status.mode') === Mode.ASSURED;
  }.property('status.mode'),

  // Computed properties for sorting
  state: function() {
    return this.get('status.health') + '.' + this.get('status.operational');
  }.property('status.health', 'status.operational'),

  cpuSort: function() {
    var mhz = this.get('capabilities.cpu_frequency');
    var cpuFrequency;
    if (!!mhz) {
      var ghz = mhz.split(' ')[0] / 1000;
      cpuFrequency = ghz + 'GHz';
    } else {
      cpuFrequency = '';
    }
    return (parseFloat(cpuFrequency) * 100 + '.' + parseFloat(this.get('capabilities.cores_per_socket')) * 50 + '.' +  parseFloat(this.get('capabilities.sockets')));
  }.property('capabilities.cpu_frequency', 'capabilities.cores_per_socket', 'capabilities.sockets'),

  // Relationships
  //nodeTrustReport: DS.belongsTo('nodeTrustReport'),
  //trustNode: DS.belongsTo('trustNode'),
  vms: DS.hasMany('vm', {async: true}),
  cgroups: DS.hasMany('cgroup')

});
