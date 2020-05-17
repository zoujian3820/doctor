// 转换为本地时间格式
export const toLocalString = (date: string) => {
  return date ? new Date(date).toLocaleString() : date
}

const textMap = {
  am: '上午',
  pm: '下午',
  ago: '前',
  just_now: '刚刚',
  minutes: '分钟',
  hours: '小时',
  weeks: '周',
  days: '天',
  months: '个月',
  years: '年'
}

// 相对时间过滤器，传入时间，返回距离今天有多久
export const timeAgo = (time: string | Date) => {
  time = time instanceof Date ? time : new Date(time)

  const between = Date.now() / 1000 - Number(time) / 1000
  const hourS = 3600
  const dayS = hourS * 24
  const weekS = dayS * 7
  const monthS = dayS * 30
  const yearS = monthS * 12

  const pluralize = (time: number, label: string) => {
    return `${time} ${label}${textMap.ago}`
  }

  if (between < hourS) {
    return ~~(between / 60) === 0
      ? textMap.just_now
      : pluralize(~~(between / 60), textMap.minutes)
  }
  if (between < dayS) {
    return pluralize(~~(between / hourS), textMap.hours)
  }
  if (between < weekS) {
    return pluralize(~~(between / dayS), textMap.days)
  }
  if (between < monthS) {
    return pluralize(~~(between / weekS), textMap.weeks)
  }
  if (between < yearS) {
    return pluralize(~~(between / monthS), textMap.months)
  }
  return pluralize(~~(between / yearS), textMap.years)
}

// YMDHMS 时间转换过滤器
export const toYMD = (date: string) => {
  if (!date) {
    return date
  }
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour = newDate.getHours() > 11 ? textMap.pm : textMap.am
  return `${year}/${month}/${day} ${hour}`
}
