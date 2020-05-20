/**
 * 定时器封装 setTimeout setInterval
 * */
import { isArray } from '~/untils'
// const isServer = typeof window === 'undefined'

const timeout = {
  /* eslint-disable no-undef */
  setTimeout: {
    $set: process.client ? window.setTimeout : null,
    $clear: process.client ? window.clearTimeout : null,
    timers: [],
    fnTimes: {},
    disabled: false,
    type: 'timeout'
  },
  setInterval: {
    $set: process.client ? window.setInterval : null,
    $clear: process.client ? window.clearInterval : null,
    timers: [],
    fnTimes: [],
    disabled: false,
    type: 'interval'
  }
}

const api = {
  set(fn, time, ...reset) {
    if (this.disabled) {
      return null
    }
    const timer = this.$set.call(window, fn, time, ...reset)
    this.timers.push(timer)
    const fnStr = this.toStr(fn)
    const fnTimes = this.fnTimes[fnStr] || []
    this.fnTimes[fnStr] = [...fnTimes, timer]
    return timer
  },
  remove(timer) {
    if (this.disabled) {
      return null
    }
    this.$clear.call(window, timer)
    this.timers = this.timers.filter((time) => time !== timer)
  },
  removeFn(fn) {
    if (this.disabled) {
      return null
    }
    const self = this
    const fnStr = this.toStr(fn)
    const timers = this.fnTimes[fnStr]
    if (isArray(timers)) {
      timers.map((timer) => {
        self.$clear.call(window, timer)
      })
      self.fnTimes[fnStr] = null
      delete self.fnTimes[fnStr]
    }
  },
  clear() {
    if (this.disabled) {
      return null
    }
    this.timers.map((timer) => {
      this.$clear.call(window, timer)
    })
    this.timers = []
    this.fnTimes = {}
  },
  toStr(fn) {
    return fn.toString()
  }
}

Object.assign(timeout.setTimeout, api)
Object.assign(timeout.setInterval, api)

if (process.client) {
  try {
    const timer = timeout.setTimeout.set(() => {}, 1, 2)
    timeout.setTimeout.remove(timer)
  } catch (e) {
    timeout.setTimeout.disabled = true
    timeout.setInterval.disabled = true
  }
}

export default timeout
