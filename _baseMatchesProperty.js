var baseIsEqual = require('./_baseIsEqual'),
    get = require('./get'),
    hasIn = require('./hasIn'),
    isKey = require('./_isKey'),
    isStrictComparable = require('./_isStrictComparable'),
    matchesStrictComparable = require('./_matchesStrictComparable'),
    toKey = require('./_toKey');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  // 有效的路径 && 普通数组[基本类型，基本类型]
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  // 返回 断言函数
  // TODO: 断言 -- 返回闭包 闭包缓存
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      // TODO: 对象对比
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;
