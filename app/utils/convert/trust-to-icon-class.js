import Trust from '../mappings/trust';
import trustIconClasses from '../mappings/trust-icon-classes';
import invert from '../invert';

/**
  Convert integer trust enum to corresponding icon classes

  @param trustEnum {number} A numerical code for trust status
  @return {string} The corresponding icon class (to be applied to an <i> tag)
*/
export default function(trustEnum) {
  var trustKeys = invert(Trust);
  var trustKey = trustKeys[trustEnum];
  var iconClass = trustIconClasses[trustKey];
  if (iconClass === undefined) iconClass = trustIconClasses.UNKNOWN;
  return iconClass;
}
