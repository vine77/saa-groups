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
import stripFloat from '../utils/strip-float';
import readableSizeToBytes from '../utils/convert/readable-size-to-bytes';

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
    if (this.get('isMonitored')) return 'fa-eye info';
    if (this.get('isAssuredCoresPhysical')) return 'fa-thumb-tack success';
    return slaToIconClass(this.get('status.sla_status'));
  }.property('status.sla_status'),
  trustMessage: function() {
    return 'Trust Status: ' + trustToString(this.get('status.trust')).capitalize();
  }.property('status.trust'),
  trustIconClass: function() {
    return trustToIconClass(this.get('status.trust'));
  }.property('status.trust'),
  memoryCurrent: function() {
    if (typeof this.get('utilization.memory') === 'number') {
      var memoryCurrent = parseInt(this.get('utilization.memory'));
      if (typeof memoryCurrent !== 'number') return null;
      return memoryCurrent * 1024;  // Assume input is KiB (cgroups API)
    } else if (typeof this.get('utilization.memory') === 'string') {
      return readableSizeToBytes(this.get('utilization.memory'), false);
    } else {
      return null;
    }
  }.property('utilization.memory'),
  memoryCurrentInGib: function() {
    if (Ember.isEmpty(this.get('memoryCurrent'))) return null;
    return (this.get('memoryCurrent') / Math.pow(1024, 3));  // bytes to GiB
  }.property('memoryCurrent'),
  memoryMax: function() {
    if (typeof this.get('capabilities.memory_size') === 'number') {
      var memoryMax = parseInt(this.get('capabilities.memory_size'));
      if (typeof memoryMax !== 'number') return null;
      return memoryMax * 1024;  // Assume input is KiB (cgroups API)
    } else if (typeof this.get('capabilities.memory_size') === 'string') {
      return readableSizeToBytes(this.get('capabilities.memory_size'), false);
    } else {
      return null;
    }
  }.property('capabilities.memory_size'),
  memoryMaxInGib: function() {
    if (Ember.isEmpty(this.get('memoryMax'))) return null;
    return (this.get('memoryMax') / Math.pow(1024, 3));  // bytes to GiB
  }.property('memoryMax'),
  hasMemoryRange: function() {
    return !Ember.isEmpty(this.get('memoryCurrent')) && !Ember.isEmpty(this.get('memoryMax'));
  }.property('memoryCurrent', 'memoryMax'),
  memoryPercent: function() {
    if (Ember.isEmpty(this.get('memoryCurrent')) || Ember.isEmpty(this.get('memoryMax'))) return null;
    return ((this.get('memoryCurrent') / this.get('memoryMax')) * 100).toFixed(0) + '%';
  }.property('memoryCurrent', 'memoryMax'),
  memoryStyle: function() {
    return 'width:' + this.get('memoryPercent');
  }.property('memoryPercent'),
  contentionCurrent: function() {
    var contention = this.get('contention.system.llc.value');
    if (Ember.isEmpty(contention)) contention = this.get('contention.llc.system.value');
    if (Ember.isEmpty(contention) || contention < 0) return null;
    return contention.toFixed(2);
  }.property('contention.system.llc.value'),
  hasContention: Ember.computed.notEmpty('contentionCurrent'),
  contentionPercent: function() {
    var contentionMax = 50;
    if (Ember.isEmpty(this.get('contentionCurrent'))) return null;
    var percent = (this.get('contentionCurrent') / contentionMax) * 100;
    if (percent > 0 && percent < 2) percent = 2;  // If any contention exists, show at least a small bar
    return percent.toFixed(0) + '%';
  }.property('contentionCurrent'),
  contentionStyle: function() {
    return 'width:' + this.get('contentionPercent');
  }.property('contentionPercent'),
  cpuFrequency: function() {
    var cpuFrequency = parseInt(this.get('node.capabilities.cpu_frequency')) / 1000;
    if (isNaN(cpuFrequency)) return Strings.NA;
    return stripFloat(cpuFrequency) + ' GHz';
  }.property('node.capabilities.cpu_frequency'),
  hasCores: Ember.computed.notEmpty('capabilities.cores'),
  cores: function() {
    var cores = this.get('capabilities.cores');
    if (Ember.isEmpty(cores)) return Strings.NA;
    return cores + ((cores === 1) ? ' core' : ' cores');
  }.property('capabilities.cores'),
  hasVcpus: Ember.computed.notEmpty('capabilities.vcpus'),
  vcpus: function() {
    var vcpus = this.get('capabilities.vcpus');
    if (Ember.isEmpty(vcpus)) return Strings.NA;
    return vcpus + ((vcpus === 1) ? ' vCPU' : ' vCPUs');
  }.property('capabilities.vcpus'),
  isAggressor: Ember.computed.gte('status.aggressor', Health.INFO),
  isVictim: Ember.computed.gte('status.victim', Health.INFO),

  // Compute SCU allocation floor/ceiling computed properties
  hasCompute: function() {
    return !Ember.isEmpty(this.get('utilizationTotal')) && !Ember.isEmpty(this.get('suFloor'));
  }.property('utilizationTotal', 'suFloor'),
  suFloor: Ember.computed.alias('capabilities.scu_allocated_min'),
  suCeiling: Ember.computed.alias('capabilities.scu_allocated_max'),
  isRange: function() {
    if (Ember.isEmpty(this.get('suFloor'))) return false;
    if (this.get('suFloor') > this.get('suCeiling')) return false;
    return this.get('suFloor') !== this.get('suCeiling');
  }.property('suFloor', 'suCeiling'),
  allocationMin: function() {
    if (Ember.isEmpty(this.get('capabilities.scu_allocated_min'))) return 0;
    if (!this.get('isRange')) return 100;
    return 100 * parseFloat(this.get('capabilities.scu_allocated_min')) / parseFloat(this.get('capabilities.scu_allocated_max'));
  }.property('isRange', 'capabilities.scu_allocated_min', 'capabilities.scu_allocated_max'),
  allocationMinWidth: function() {
    return 'width:' + this.get('allocationMin') + 'px;';
  }.property('allocationMin'),
  allocationMessage: function() {
    var message = '';
    if (this.get('isRange')) {
      message += 'Utilization: ' + stripFloat(this.get('utilizationTotal')) + '\n';
      if (this.get('utilizationBurst')) {
        message += 'Non-bursting: ' + stripFloat(this.get('utilizationCurrent')) + '\n';
        message += 'Bursting: ' + this.get('utilizationBurst').toFixed(2) + '\n';
      }
      message += 'Min Allocated: ' + stripFloat(this.get('capabilities.scu_allocated_min')) + '\n';
      message += 'Burst Allocated: ' + stripFloat(this.get('capabilities.scu_allocated_max'));
    } else {
      message += 'Utilization: ' + stripFloat(this.get('utilizationTotal')) + '\n';
      if (this.get('utilizationBurst')) {
        message += 'Non-bursting: ' + stripFloat(this.get('utilizationCurrent')) + '\n';
        message += 'Bursting: ' + stripFloat(this.get('utilizationBurst')) + '\n';
      }
      message += 'Allocated: ' + stripFloat(this.get('capabilities.scu_allocated_min'));
    }
    return message;
  }.property('isRange', 'utilizationTotal', 'utilizationCurrent', 'utilizationBurst', 'capabilities.scu_allocated_min', 'capabilities.scu_allocated_max'),
  utilizationBurst: function() {
    if (Ember.isEmpty(this.get('scuTotal')) || Ember.isEmpty(this.get('capabilities.scu_allocated_min'))) return 0;
    var burst = Math.max(0, this.get('scuTotal') - this.get('capabilities.scu_allocated_min'));
    return stripFloat(burst);
  }.property('capabilities.scu_allocated_min', 'scuTotal'),
  utilizationTotal: function() {
    var utilization = this.get('scuTotal');
    if (Ember.isEmpty(utilization)) utilization = this.get('utilization.scu_max');
    if (Ember.isEmpty(utilization) || utilization < 0) return null;
    return utilization;
  }.property('scuTotal', 'utilization.scu_max'),
  utilizationCurrent: function() {
    var total = this.get('utilizationTotal');
    if (Ember.isEmpty(total)) total = 0;
    return Math.max(0, total - this.get('utilizationBurst'));
  }.property('utilizationTotal', 'utilizationBurst'),
  utilizationBurstWidth: function() {
    if (Ember.isEmpty(this.get('capabilities.scu_allocated_max'))) return null;
    var percent = 100 * parseFloat(this.get('utilizationBurst')) / parseFloat(this.get('capabilities.scu_allocated_max'));
    return 'width:' + percent.toFixed(0) + 'px;';
  }.property('utilizationBurst', 'capabilities.scu_allocated_max'),
  utilizationCurrentWidth: function() {
    if (Ember.isEmpty(this.get('capabilities.scu_allocated_max'))) return null;
    var percent = 100 * parseFloat(this.get('utilizationCurrent')) / parseFloat(this.get('capabilities.scu_allocated_max'));
    return 'width:' + percent.toFixed(0) + 'px;';
  }.property('utilizationCurrent', 'capabilities.scu_allocated_max'),
  utilizationBurstLeft: function() {
    var percent;
    if (Ember.isEmpty(this.get('capabilities.scu_allocated_max'))) return null;
    if (!this.get('isRange')) {
      // Current
      percent = 100 * parseFloat(this.get('utilizationCurrent')) / parseFloat(this.get('capabilities.scu_allocated_max'));
      return 'left:' + percent.toFixed(0) + 'px;';
    } else {
      // Max of current and scu_allocated_min
      var left = Math.max(this.get('utilizationCurrent'), this.get('capabilities.scu_allocated_min'));
      percent = (100 * left / parseFloat(this.get('capabilities.scu_allocated_max'))) + 1;
      return 'left:' + percent.toFixed(0) + 'px;';
    }
  }.property('isRange', 'capabilities.scu_allocated_max', 'utilizationCurrent'),
  utilizationBurstStyle: function() {
    return this.get('utilizationBurstWidth') + this.get('utilizationBurstLeft');
  }.property('utilizationBurstWidth', 'utilizationBurstLeft')
});
