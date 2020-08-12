// 持续调用,间歇时间不超过设定延迟时间,实际只调用了一次。

function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        // 清除上一次的定时器
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout; 
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) {
                result = func.apply(context, args)
            }
        }
        else {
            // 重新生成一个定时器
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}