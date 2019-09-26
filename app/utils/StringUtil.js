/**
 * Created by chengkai on 2017/12/10.
 * 字符串操作工具类
 */

/* 隐藏手机号中间部分 */
export const hidePhoneNum = phone => {
  if (!phone || (!!phone && phone.length < 5)) return phone;
  let myphone = phone.substr(3, 4);
  return phone.replace(myphone, '****');
};

/* 格式化日期时间 */
export const formatTime = now => {
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minute =
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  return (
    year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second
  );
};

/**
 ** 生成 n 位的随机数
 **/
export const randomNum = n => {
  var rnd = '';
  for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
  return rnd;
};

/**
 ** 时间戳转日期
 **/
export const generateOrderNo = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minute =
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  return `${year}${month}${date}${hour}${minute}${second}` + randomNum(18);
};

/**
 * 处理字符串, 避免UI出现 undefined | null 字样
 * @param str
 * @returns {string}
 */
export const handleStr = str => {
  return !!str ? str : '';
};

/**
 * 处理银行卡号展示
 * @param str
 */
export const handleBankCardMask = str => {
  let cardNum = str;
  if (str && str.length >= 5) {
    cardNum = str.substr(0, 4) + '••••••••' + str.substr(-4);
    cardNum = cardNum.replace(/(.{4})/g, '$1  ');
  }
  return cardNum;
};

export const isImage = filename =>
  /.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(
    filename ? filename.toLowerCase() : filename,
  );
