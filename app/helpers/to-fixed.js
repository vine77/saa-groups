import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(number, digits) {
  if (isNaN(parseFloat(number))) {
    return null;
  } else {
    number = parseFloat(number);
  }
  if (digits === undefined) digits = 0;
  return number.toFixed(digits);
});
