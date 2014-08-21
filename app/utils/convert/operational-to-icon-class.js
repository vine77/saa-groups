import Operational from '../mappings/operational';
import operationalIconClasses from '../mappings/operational-icon-classes';
import invert from '../invert';

/**
  Convert integer operational enum to corresponding icon classes

  @param operationalEnum {number} A numerical code for operational state
  @return {string} The corresponding icon class (to be applied to an <i> tag)
*/
export default function(operationalEnum) {
  var operationalKeys = invert(Operational);
  var operationalKey = operationalKeys[operationalEnum];
  var iconClass = operationalIconClasses[operationalKey];
  if (iconClass === undefined) iconClass = operationalIconClasses.UNKNOWN;
  return iconClass;
}
