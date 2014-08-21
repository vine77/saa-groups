/**
  Invert the keys and values of an object. The values must be serializable.

  See http://underscorejs.org/docs/underscore.html#section-82
*/
export default function(obj) {
  var result = {};
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    result[obj[keys[i]]] = keys[i];
  }
  return result;
}
