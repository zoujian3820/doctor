// 公共的filter
export default {
  // 文字溢出过滤器
  textOverflow(text, customLength) {
    const length = customLength || text.length
    const cansub = length && text?.length > length
    return cansub ? text.substr(0, length) + '...' : text
  },
  // 首字母大写
  firstUpperCase(text) {
    return text?.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  }
}
