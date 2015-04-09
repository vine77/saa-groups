import Ember from 'ember';

/**
  Convert a number in bytes to a formatted string with units

  @param stringSize {string} The value and units as a concatenated string
  @param decimalPrefix {number} An optional boolean to force processing the input as a decimal value (or false for a binary value), with the default being to guess based on the string units
  @return {int} The value in bytes
*/
export default function(stringSize, decimalPrefix) {
  var power, multiplier;
  if (Ember.isEmpty(stringSize)) return null;
  var intSize = parseInt(stringSize);
  var inputUnits = stringSize.replace(intSize, '').trim().toUpperCase();
  var decimalUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var binaryUnits = ['B', 'KIB', 'MIB', 'GIB', 'TIB', 'PIB', 'EIB', 'ZIB', 'YIB'];
  if (decimalUnits.indexOf(inputUnits) !== -1) {
    power = (typeof decimalPrefix === 'undefined') ? 1000 : (decimalPrefix ? 1000 : 1024);
    multiplier = Math.pow(power, decimalUnits.indexOf(inputUnits));
    return intSize * multiplier;
  } else if (binaryUnits.indexOf(inputUnits) !== -1) {
    power = (typeof decimalPrefix === 'undefined') ? 1024 : (decimalPrefix ? 1000 : 1024);
    multiplier = Math.pow(power, binaryUnits.indexOf(inputUnits));
    return intSize * multiplier;
  } else {
    return null;
  }
}
