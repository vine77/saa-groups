import Sla from '../mappings/sla';
import invert from '../invert';

/**
  Convert integer code of SLA status to corresponding string representation

  @param slaEnum {number} A numerical code for SLA status
  @return {string} The corresponding lowercase string representation for that SLA status code
*/
export default function(slaEnum) {
  var slaStrings = invert(Sla);
  var slaString = slaStrings[slaEnum];
  // Return lowercase space-delimited string (from SLA mapping keys)
  if (typeof slaString === 'string') slaString = slaString.replace('_', ' ').toLowerCase();
  // Default to "unknown" if slaEnum doesn't match a key from SLA mapping
  if (slaString === undefined) slaString = slaStrings[Sla.UNKNOWN].toLowerCase();
  return slaString;
}
