import type { ResortTag } from '../data/tags'
import type { ResortEntry } from './resorts'

export function getTaiwanToday(date = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export function hasActiveEarlyBird(resort: ResortEntry, today = getTaiwanToday()) {
  return resort.data.tickets?.earlyBird?.some((item) => item.deadline >= today) ?? false
}

export function getResortTags(resort: ResortEntry, today = getTaiwanToday()): ResortTag[] {
  const tags = new Set<ResortTag>(resort.data.tags.filter((tag) => tag !== 'early_bird'))

  if (hasActiveEarlyBird(resort, today)) {
    tags.add('early_bird')
  }

  return [...tags]
}
