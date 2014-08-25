import Ember from 'ember';
import Strings from '../utils/mappings/strings';
import healthToString from '../utils/convert/health-to-string';
import healthToIconClass from '../utils/convert/health-to-icon-class';
import operationalToString from '../utils/convert/operational-to-string';
import operationalToIconClass from '../utils/convert/operational-to-icon-class';
import slaToString from '../utils/convert/sla-to-string';
import slaToIconClass from '../utils/convert/sla-to-icon-class';

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
  memoryCurrent: function() {
    var memory = this.get('utilization.memory');
    if (!Number.isInteger(memory)) return null;
    return (memory / Math.pow(1024, 2)).toFixed(2);
  }.property('utilization.memory'),
  memoryMax: function() {
    var memory = this.get('capabilities.memory_size');
    if (!Number.isInteger(memory)) return null;
    return (memory / Math.pow(1024, 2)).toFixed(2);
  }.property('capabilities.memory_size'),
  memoryPercent: function() {
    if (!Number.isInteger(this.get('utilization.memory')) || !this.get('capabilities.memory_size')) return null;
    return ((this.get('utilization.memory') / this.get('capabilities.memory_size')) * 100).toFixed(0) + '%';
  }.property('utilization.memory', 'capabilities.memory_size'),
  cpuFrequency: function() {
    var cpuFrequency = parseInt(this.get('node.capabilities.cpu_frequency')) / 1000;
    if (isNaN(cpuFrequency)) return Strings.NA;
    return cpuFrequency.toFixed(2) + ' GHz';
  }.property('node.capabilities.cpu_frequency'),
  cores: function() {
    var cores = this.get('capabilities.cores');
    if (!Number.isInteger(cores)) return Strings.NA;
    return cores + ((cores === 1) ? ' core' : ' cores');
  }.property('capabilities.cores')
});
