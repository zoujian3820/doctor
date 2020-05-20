export const _toString = Object.prototype.toString

export function isObject(obj: any) {
  return _toString.call(obj) === '[object Object]'
}

export function isArray(arr: any) {
  return _toString.call(arr) === '[object Array]'
}

export function isFunction(fn: any) {
  return _toString.call(fn) === '[object Function]'
}

// eslint-disable-next-line no-undef
export function queryStr(url: string, obj: object): string {
  let str = url
  for (const key in obj) {
    str +=
      (str.includes('?') ? '&' : '?') + key + '=' + encodeURIComponent(obj[key])
  }
  return str
}
