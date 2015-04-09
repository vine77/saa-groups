import Ember from 'ember';
import Strings from '../utils/mappings/strings';

export default Ember.Handlebars.makeBoundHelper(function (value, options) {
  if (Ember.isEmpty(value)) return null;
  if (value === -1) return Strings.NA;
  var fullString = value.toString();
  if (options.hash && options.hash.suffix) fullString = fullString + options.hash.suffix;
  if (options.hash && options.hash.prefix) fullString = options.hash.prefix + fullString;
  return fullString;
});
