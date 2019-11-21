// 匹配规则 2018-11-20
export const dateRule = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

// 匹配规则 第一位是1 第二位不能是2 长度是11位的数
export const phoneNumbeRule = /^1[3456789]\d{9}$/;

// 匹配规则 数字,最多允许输入两位小数 允许正负数  12/12.2/12.23/-12/-0
export const doubleWithNegativeRule = /(^-?[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^-?(0){1}$)|(^-?[0-9]\.[0-9]([0-9])?$)/;

// 匹配规则 非负 第一位非0的数字 最多允许输入两位小数
export const doubleRule = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

// 匹配规则 非负 匹配空或者第一位非0的数字，最多允许输入两位小数
export const doubleOrNullRule = /(^\s*$|^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

// 匹配任意正整数
export const positiveNumberRule = /^\d*$/;

//转为千分符
export const millimeter = /(\d)(?=(\d{3})+\.)/g;
/**
 * 匹配规则 整数
 * min: 最小允许输入几位
 * max: 最大允许输入几位
 */
export const numberRule = (min, max) => new RegExp(`^\\d{${min},${max}}$`);

// 匹配规则 非负 数字
export const numberWithNegativeRule = (min, max) =>
  new RegExp(`^-?\\d{${min},${max}}$`);

// 匹配规则 数字1-10位
// export const number10Rule = /^\d{1,10}$/;

// 匹配规则 数字、字母
export const numberOrWordRule = (min, max) =>
  new RegExp(`^[0-9a-zA-Z]{${min},${max}}$`);

// 匹配任意字符
export const allRule = (min, max) => new RegExp(`^.{${min},${max}}$`);

// 匹配中文
export const ChineseRule = (min, max) =>
  new RegExp(`^[\\u4E00-\\u9FA5]{${min},${max}}$`);

// 匹配所有非中文
export const notChineseRule = (min, max) =>
  new RegExp(`^[^\\u4E00-\\u9FA5]{${min},${max}}$`);

// 字母+数字，以字母开头
export const worldAndNumberHWRule = (min, max) =>
  new RegExp(`^[a-zA-Z](?![a-zA-Z]+$)[0-9a-zA-Z]{${min},${max}}$`);
