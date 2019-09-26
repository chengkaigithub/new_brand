/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */

/**
 * 节流
 * @param e
 * @param t
 * @param r
 * @returns {Function}
 */
export const throttle = function(e, t, r) {
  var n,
    s,
    i,
    o = null,
    a = 0;
  r || (r = {});
  var c = function() {
    (a = r.leading === !1 ? 0 : Date.now()),
      (o = null),
      (i = e.apply(n, s)),
      o || (n = s = null);
  };
  return function() {
    var u = Date.now();
    a || r.leading !== !1 || (a = u);
    var l = t - (u - a);
    return (
      (n = this),
      (s = arguments),
      l <= 0 || l > t
        ? (o && (clearTimeout(o), (o = null)),
          (a = u),
          (i = e.apply(n, s)),
          o || (n = s = null))
        : o || r.trailing === !1 || (o = setTimeout(c, l)),
      i
    );
  };
};

/**
 * 补偿处理
 * @param  {object} options.count  调用次数
 * @param  {object} options.delay  间隔时间
 * @param  {function} hundle    调用方法
 * @return {undefined}
 */
export const compensationDeals = (options, hundle) => {
  let size = 0;
  const {count, delay} = options;

  const fail = () => {
    size++;
    if (size >= count) return;
    setTimeout(() => {
      hundle(fail);
    }, delay);
  };

  hundle(fail);
};
