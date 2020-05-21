// 获取浏览器和系统的信息
const parser = require('ua-parser-js')

export const uaParser = (userAgent: string) => {
  const parseResult = parser(userAgent || '')
  const browserName = String(parseResult.browser.name).toLowerCase()
  const isBrowser = (browsers: string[]) => {
    return browsers.some((browser) => browser.toLowerCase() === browserName)
  }

  return {
    result: parseResult,
    isIE: isBrowser(['compatible', 'MSIE', 'IE']),
    isEdge: isBrowser(['Edge']),
    isFirefox: isBrowser(['Firefox']),
    isChrome: isBrowser(['Chrome', 'Chromium']),
    isSafari: isBrowser(['Safari']),
    isWechat: isBrowser(['Wechat']),
    isToutiao: parseResult.ua.includes('Toutiao'),
    isIOS: parseResult.os.name === 'iOS',
    isAndroid: parseResult.os.name === 'Android',
    isMobile: parseResult.device.type === 'mobile'
  }
}
