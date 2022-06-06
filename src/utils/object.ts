import compare from 'react-fast-compare';

// 判断两个值是否相等
export function isEqual(a: any, b: any) {
  return compare(a, b);
}