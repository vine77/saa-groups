import Health from '../mappings/health';
import healthIconClasses from '../mappings/health-icon-classes';
import invert from '../invert';

/**
  Convert integer health enum to corresponding icon classes

  @param healthEnum {number} A numerical code for health
  @return {string} The corresponding icon class (to be applied to an <i> tag)
*/
export default function(healthEnum) {
  var healthKeys = invert(Health);
  var healthKey = healthKeys[healthEnum];
  var iconClass = healthIconClasses[healthKey];
  if (iconClass === undefined) iconClass = healthIconClasses.UNKNOWN;
  return iconClass;
}
