import Trust from '../mappings/trust';
import invert from '../invert';

/**
  Convert integer code of trust status to corresponding string representation

  @param trustEnum {number} A numerical code for trust status
  @return {string} The corresponding lowercase string representation for that trust status code
*/
export default function(trustEnum) {
  var trustStrings = invert(Trust);
  var trustString = trustStrings[trustEnum];
  // Return lowercase space-delimited string (from trust mapping keys)
  if (typeof trustString === 'string') trustString = trustString.replace('_', ' ').toLowerCase();
  // Default to "unknown" if trustEnum doesn't match a key from trust mapping
  if (trustString === undefined) trustString = trustStrings[Trust.UNKNOWN].toLowerCase();
  return trustString;
}
