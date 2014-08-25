import Ember from 'ember';
import Strings from '../utils/mappings/strings';
import Health from '../utils/mappings/health';
import healthToString from '../utils/convert/health-to-string';
import healthToIconClass from '../utils/convert/health-to-icon-class';
import operationalToString from '../utils/convert/operational-to-string';
import operationalToIconClass from '../utils/convert/operational-to-icon-class';
import slaToString from '../utils/convert/sla-to-string';
import slaToIconClass from '../utils/convert/sla-to-icon-class';
import trustToString from '../utils/convert/trust-to-string';
import trustToIconClass from '../utils/convert/trust-to-icon-class';

export default Ember.Mixin.create({
  healthMessage: function() {
    return 'Health: ' + healthToString(this.get('status.health'), 'good').capitalize();
  }.property('status.health'),
  healthIconClass: function() {
    return healthToIconClass(this.get('status.health'));
  }.property('status.health'),
  operationalMessage: function() {
    return 'Operational State: ' + operationalToString(this.get('status.operational')).capitalize();
  }.property('status.operational'),
  operationalIconClass: function() {
    return operationalToIconClass(this.get('status.operational'));
  }.property('status.operational'),
  slaMessage: function() {
    return 'SLA Status: ' + slaToString(this.get('status.sla_status')).capitalize();
  }.property('status.sla_status'),
  slaIconClass: function() {
    return slaToIconClass(this.get('status.sla_status'));
  }.property('status.sla_status'),
  trustMessage: function() {
    return 'Trust Status: ' + trustToString(this.get('status.trust')).capitalize();
  }.property('status.trust'),
  trustIconClass: function() {
    return trustToIconClass(this.get('status.trust'));
  }.property('status.trust'),
  memoryCurrent: function() {
    var memory = parseInt(this.get('utilization.memory'));
    if (!Number.isInteger(memory)) return null;
    return (memory / Math.pow(1024, 2)).toFixed(2);  // Assume KiB
  }.property('utilization.memory'),
  memoryMax: function() {
    var memory = this.get('capabilities.memory_size');
    if (!Number.isInteger(memory)) return null;
    return (memory / Math.pow(1024, 2)).toFixed(2);  // Assume KiB
  }.property('capabilities.memory_size'),
  memoryPercent: function() {
    if (!Number.isInteger(this.get('utilization.memory')) || !this.get('capabilities.memory_size')) return null;
    return ((this.get('utilization.memory') / this.get('capabilities.memory_size')) * 100).toFixed(0) + '%';
  }.property('utilization.memory', 'capabilities.memory_size'),
  memoryStyle: function() {
    return 'width:' + this.get('memoryPercent');
  }.property('memoryPercent'),
  utilizationCurrent: function() {
    var utilization = this.get('utilization.scu_current');
    if (!utilization || !(utilization >= 0)) return null;
    return utilization;
  }.property('utilization.scu_current'),
  utilizationMax: function() {
    var scuMax = this.get('utilization.scu_max') || this.get('capabilities.scu_allocated_max');
    if (!scuMax || !(scuMax >= 0)) return null;
    return scuMax;
  }.property('utilization.scu_max', 'capabilities.scu_allocated_max'),
  utilizationPercent: function() {
    if (!this.get('utilizationCurrent') || !this.get('utilizationMax')) return null;
    return ((this.get('utilizationCurrent') / this.get('utilizationMax')) * 100).toFixed(0) + '%';
  }.property('utilizationCurrent', 'utilizationMax'),
  utilizationStyle: function() {
    return 'width:' + this.get('utilizationPercent');
  }.property('utilizationPercent'),
  contentionCurrent: function() {
    var contention = this.get('contention.system.llc.value');
    if (!contention || !(contention >= 0)) return null;
    return contention.toFixed(2);
  }.property('contention.system.llc.value'),
  contentionPercent: function() {
    var contentionMax = 50;
    if (!this.get('contention.system.llc.value') || !(this.get('contention.system.llc.value') >= 0)) return null;
    var percent = (this.get('contention.system.llc.value') / contentionMax) * 100;
    if (percent > 0 && percent < 2) percent = 2;  // If any contention exists, show at least a small bar
    return percent.toFixed(0) + '%';
  }.property('contention.system.llc.value'),
  contentionStyle: function() {
    return 'width:' + this.get('contentionPercent');
  }.property('contentionPercent'),
  cpuFrequency: function() {
    var cpuFrequency = parseInt(this.get('node.capabilities.cpu_frequency')) / 1000;
    if (isNaN(cpuFrequency)) return Strings.NA;
    return cpuFrequency.toFixed(2) + ' GHz';
  }.property('node.capabilities.cpu_frequency'),
  cores: function() {
    var cores = this.get('capabilities.cores');
    if (!Number.isInteger(cores)) return Strings.NA;
    return cores + ((cores === 1) ? ' core' : ' cores');
  }.property('capabilities.cores'),
  isAggressor: Ember.computed.gte('status.aggressor', Health.INFO),
  isVictim: Ember.computed.gte('status.victim', Health.INFO)
});
