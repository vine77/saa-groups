import Health from '../mappings/health';
import invert from '../invert';

/**
  Convert integer code of health to corresponding string representation

  @param healthEnum {number} A numerical code for health
  @param successString {string} (optional) A string to use in place of 'success'
  @return {string} The corresponding lowercase string representation for that priority level: 'unknown', 'success', 'info', 'warning', or 'error'
*/
export default function(healthEnum, successString) {
  var healthStrings = invert(Health);
  var healthString = healthStrings[healthEnum];
  // Allow using a term other than "success" with the second function parameter (successString)
  if (typeof successString !== undefined && healthEnum === Health.SUCCESS) return successString;
  // Return lowercase string (from Health mapping keys)
  if (typeof healthString === 'string') healthString = healthString.toLowerCase();
  // Default to "unknown" if healthEnum doesn't match a key from Health mapping
  if (healthString === undefined) healthString = healthStrings[Health.UNKNOWN].toLowerCase();
  return healthString;
}
