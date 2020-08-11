var baseMatches = require('./_baseMatches'),
    baseMatchesProperty = require('./_baseMatchesProperty'),
    identity = require('./identity'),
    isArray = require('./isArray'),
    property = require('./property');

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    // TODO: 断言/函数 -- 返回函数
    return value;
  }
  if (value == null) {
    // TODO: 断言/null -- 返回函数
    return identity;
  }
  // 对象的需要做特殊处理
  if (typeof value == 'object') {
    return isArray(value)
    // TODO: 数组
      ? baseMatchesProperty(value[0], value[1])
    // TODO: 对象
      : baseMatches(value);
  }
  // TODO: 断言/字符串 -- 返回函数
  return property(value);
}

module.exports = baseIteratee;
