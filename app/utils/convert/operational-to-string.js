import Operational from '../mappings/operational';
import invert from '../invert';

/**
  Convert integer code of operational state to corresponding string representation

  @param operationalEnum {number} A numerical code for operational state
  @return {string} The corresponding lowercase string representation for that operational code
*/
export default function(operationalEnum) {
  var operationalStrings = invert(Operational);
  var operationalString = operationalStrings[operationalEnum];
  // Return lowercase space-delimited string (from Operational mapping keys)
  if (typeof operationalString === 'string') operationalString = operationalString.replace('_', ' ').toLowerCase();
  // Default to "unknown" if operationalEnum doesn't match a key from Operational mapping
  if (operationalString === undefined) operationalString = operationalStrings[Operational.UNKNOWN].toLowerCase();
  return operationalString;
}
