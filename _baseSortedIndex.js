var baseSortedIndexBy = require('./_baseSortedIndexBy'),
    identity = require('./identity'),
    isSymbol = require('./isSymbol');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,//TODO: 无符号最大数
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1; //TODO: 有符号最大数

/**
 * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
 * performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndex(array, value, retHighest) {
  var low = 0,
      high = array == null ? low : array.length;
  // number 非NaN 长度小于最大值
  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    // TODO: 二分法
    while (low < high) {
      var mid = (low + high) >>> 1,// 去中间值 奇数的话会小 1 相当于 /2 再求floor
          computed = array[mid];

      if (computed !== null && !isSymbol(computed) &&
          (retHighest ? (computed <= value) : (computed < value))) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  // TODO: value非数字类型，需要传默认迭代器器处理
  return baseSortedIndexBy(array, value, identity, retHighest);
}

module.exports = baseSortedIndex;
