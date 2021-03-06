/**
 * Created by chengkai on 2017/11/30.
 * 数据校验工具类
 */

/* 校验是否为空 */
export const checkNull = (data: any) => !!data;

/* 校验是否为汉字 */
export const checkCharacter = (character: string) => /^[\u2E80-\u9FFF]+$/.test(character);

/* 校验身份证号码 */
export const checkIDNumber = (idNum: string) => /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(idNum);

/* 校验手机号码 */
export const checkPhoneNo = (phoneNo: string) => /^1\d{10}$/.test(phoneNo) && '' !== phoneNo;

/* 校验密码(6-16英文字母数字) */
export const checkPassword = (password: string) => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(password);

/* 校验是否为纯数字 */
export const checkIsNumber = (num: string) => /^[0-9]*$/.test(num);

/* 校验支付密码复杂度 */
export const checkPayPass = (pass: string, loginName: string = '') => {
  if (!/^\d{6}$/.test(pass)) return false; // 不是6位数字
  if (/^(\d)\1+$/.test(pass)) return false; // 全一样

  // @ts-ignore
  let str = pass.replace(/\d/g, (arg1, index) => parseInt(arg1, 10) - index);
  if (/^(\d)\1+$/.test(str)) return false; // 递增

  str = pass.replace(/\d/g, (arg1, index) => parseInt(arg1, 10) + index);
  if (/^(\d)\1+$/.test(str)) return false; // 递减

  if (new RegExp(pass).test(loginName)) return false; // 不能是账号的一部分

  return true;
};

/* 校验正浮点数 */
export const floatNumber = (num: string) =>
  /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[0-9][0-9]*))$/.test(num);
