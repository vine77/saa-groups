import Ember from 'ember';
import Strings from '../utils/mappings/strings';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  return (Ember.isEmpty(value)) ? Strings.NA : value;
});
