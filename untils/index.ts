export const _toString = Object.prototype.toString

export function isObject(obj: any) {
  return _toString.call(obj) === '[object Object]'
}

export function isArray(arr: any) {
  return _toString.call(arr) === '[object Array]'
}
