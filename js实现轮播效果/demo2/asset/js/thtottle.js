// 简单的节流函数
// 使用定时器
function throttle (func, wait) {
  var timeout;
  var previous = 0;

  return function () {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args)
      }, wait)
    }
  }
}