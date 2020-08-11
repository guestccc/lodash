var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @ccc 可以认为是 判断 是否是 基本类型
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  // 不是 NaN && 不是对象
  return value === value && !isObject(value); // typeof function 和 object 都可以
}

module.exports = isStrictComparable;
