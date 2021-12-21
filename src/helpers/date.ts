import { TimeUnit } from '../constants/timeUnit'

// a function that returns relative time
export function relativeTime(dateObj: Date | string): string {
  let delta = Date.now() - (typeof dateObj == 'string' ? new Date(dateObj) : dateObj) .getTime()
  const now_threshold = 5000
  if (delta <= now_threshold) {
    return 'just now'
  }
  var units = '',
    conversions = {
      s: 1000,
      min: 60,
      h: 60,
      d: 24,
      mo: 30,
      y: 12,
    }

  for (var key in conversions) {
    //@ts-ignore
    if (delta < conversions[key]) {
      break
    } else {
      units = key
      //@ts-ignore
      delta = delta / conversions[key]
    }
  }
  delta = Math.floor(delta)
  if (delta !== 1) {
    units += 's'
  }
  return [delta, units, ' ago '].join(' ')
}

// a function that accepts relative time string and return a date
export function parseRelativeTime(time: string): Date {
  const now = new Date()
  let date = new Date(now.getTime())
  const suffixes = Array.from(Object.values(TimeUnit))

  for (const part of time.split(' ')) {
    const diff = parseInt(
      part
        .replace('min', '')
        .replace('h', '')
        .replace('d', '')
        .replace('m', ''),
    )
    switch (suffixes.find((suffix) => part.endsWith(suffix))) {
      case TimeUnit.MONTH:
        date = new Date(date.getTime() - diff * 1000 * 60 * 60 * 24 * 30)
        break
      case TimeUnit.MINUTE:
        date = new Date(date.getTime() - diff * 60 * 1000)
        break
      case TimeUnit.HOUR:
        date = new Date(date.getTime() - diff * 60 * 60 * 1000)
        break
      case TimeUnit.DAY:
        date = new Date(date.getTime() - diff * 24 * 60 * 60 * 1000)
        break
    }
  }

  return date
}
