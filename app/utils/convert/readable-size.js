import Ember from 'ember';
import bytesToReadableSize from './bytes-to-readable-size';

/**
  Convert a string including both number and units to a human-readable string

  @param size {string} The number and unit in a string separated by a space
  @return {string} A human-readable string or null if not processable
*/
export default function(size) {
  if (Ember.isEmpty(size) || size < 0) return null;
  if (typeof size === 'string') {
    // Assume backend is using historic units for customary binary prefixes
    var byteUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    size = size.split(' ');
    if (size[1] && byteUnits.indexOf(size[1].toUpperCase()) === -1) return null;
    var multiplier = Math.pow(1024, byteUnits.indexOf(size[1].toUpperCase()));
    var sizeBase = parseInt(size[0]);
    if (isNaN(sizeBase)) return null;
    return bytesToReadableSize(sizeBase, multiplier);
  } else if (typeof size === 'number') {
    return bytesToReadableSize(size);
  } else {
    return null;
  }
}
