import Sla from '../mappings/sla';
import slaIconClasses from '../mappings/sla-icon-classes';
import invert from '../invert';

/**
  Convert integer SLA enum to corresponding icon classes

  @param slaEnum {number} A numerical code for SLA status
  @return {string} The corresponding icon class (to be applied to an <i> tag)
*/
export default function(slaEnum) {
  var slaKeys = invert(Sla);
  var slaKey = slaKeys[slaEnum];
  var iconClass = slaIconClasses[slaKey];
  if (iconClass === undefined) iconClass = slaIconClasses.UNKNOWN;
  return iconClass;
}
