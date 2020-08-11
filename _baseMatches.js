var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData'),
    matchesStrictComparable = require('./_matchesStrictComparable');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source); // return  [['key', 'value', false]]
  // TODO: 源对象只有一个 key ，当作数组处理
  if (matchData.length == 1 && matchData[0][2]) {
    // 返回闭包，缓存源对象转换成的 key 和 value ，用于判断给定对象是否存在源对象中的 属性和对应的值
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    // 同个引用 或者 
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;
