/**
 * 解析 金额
 * @param resLimit    要解析的限额值
 * @param tempLimit   备用值(异常情况采用)
 * @returns {number}
 */
export const parseMoneyWithBackups = (resLimit: string, tempLimit: number) => {
  let mLimit: number = tempLimit;
  try {
    mLimit = parseFloat(resLimit);
  } catch (e) {
    mLimit = tempLimit;
  }
  mLimit = isNaN(mLimit) ? tempLimit : mLimit;
  return mLimit;
};
