import Ember from 'ember';
import healthToString from '../utils/convert/health-to-string';
import healthToIconClass from '../utils/convert/health-to-icon-class';
import operationalToString from '../utils/convert/operational-to-string';
import operationalToIconClass from '../utils/convert/operational-to-icon-class';

export default Ember.Mixin.create({
  healthMessage: function() {
    return 'Health: ' + healthToString(this.get('status.health'), 'good').capitalize();
  }.property('status.health'),
  healthIconClass: function() {
    return healthToIconClass(this.get('status.health'));
  }.property('status.health'),
  operationalMessage: function() {
    return 'State: ' + operationalToString(this.get('status.operational')).capitalize();
  }.property('status.operational'),
  operationalIconClass: function() {
    return operationalToIconClass(this.get('status.operational'));
  }.property('status.operational'),
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
  }.property('utilization.memory', 'capabilities.memory_size')
});
