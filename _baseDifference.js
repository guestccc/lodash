var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    arrayMap = require('./_arrayMap'),
    baseUnary = require('./_baseUnary'),
    cacheHas = require('./_cacheHas');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  // 给定数组遍历
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);
    // Because internally we use Set for deduping and Set doesn't distinguish between the two. [作者解释 issuse](https://github.com/lodash/lodash/issues/3175)
    value = (comparator || value !== 0) ? value : 0;
    // 普通模式执行下面代码 去除无法直接对比的，不是使用array[index] 取值的，
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      // 源数组遍历
      while (valuesIndex--) {
        // 存在 跳出
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      // 不存在 存起来
      result.push(value);
    }
    // 非正常数组处理模式下，调用includes方法，源数组中不存在则存起来
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;
