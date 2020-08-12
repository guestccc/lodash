var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    cacheHas = require('./_cacheHas'),
    createSet = require('./_createSet'),
    setToArray = require('./_setToArray');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200; // 作为数组处理的最大数组长度

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

      //非正常数组处理
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {//TODO:  长度超过200后启用，大数组优化策略 set
    var set = iteratee ? null : createSet(array); // set 去重
    if (set) {
      return setToArray(set); // set => array
    }
    // 非正常数组处理
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache; // lodash自己实现的一种 类似 缓存容器 没仔细研究
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  // 给定数组遍历
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
     // 普通模式执行下面代码
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      // 缓存数组遍历
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) { // 有iteratee 的情况下，seen === result
        seen.push(computed); // 用来做对比的，iteratee处理后的
      }
      result.push(value); // 最后返回的，没作iteratee处理，原生的
    }
    // 非正常数组处理模式下，调用includes方法，判断缓存容器中是否存在重复的值
    else if (!includes(seen, computed, comparator)) {
       // 有comparator的情况下，seen === result ，这种写法看起来就很懵逼，直接判断comparator不就好了么
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;
