var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @ccc 1. 一层对象，2. 非一层对象
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;
  
  // 给定对象是 null，返回源对象的长度取反
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    // TODO: ccc 基本类型
    if ((noCustomizer && data[2]) // 没有比较函数 && 源对象的值是基本类型的
          ? data[1] !== object[data[0]] // 判读值是否不相等
          : !(data[0] in object) // 判断key是否不在给定对象
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    // TODO: ccc 基本类型 这一块其实可以整合在上面
    if (noCustomizer && data[2]) { // 没有比较函数 && 源对象的值是基本类型的
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      // TODO: ccc 引用类型 || 有比较函数
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;
