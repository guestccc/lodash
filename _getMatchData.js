var isStrictComparable = require('./_isStrictComparable'),
    keys = require('./keys');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
  // ccc isStrictComparable 返回 booleam （不是 NaN && 不是对象）
    result[length] = [key, value, isStrictComparable(value)];
  }
  // [['key', 'value', false]]
  return result;
}

module.exports = getMatchData;
