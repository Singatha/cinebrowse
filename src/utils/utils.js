import { GENRES } from "./constants"

export const formatGenresByID = (genre_ids) => {
  return (genre_ids ?? []).map((id) => GENRES[id]).filter(Boolean).join(', ')
}

export const formatGenresByName = (genres) => {
  return (genres ?? []).map((genre) => genre.name).filter(Boolean).join(', ')
}

export const formatDate = (date) => {
  if (!date) return 'Not available'

  const parsedDate = new Date(`${date}T00:00:00Z`)

  if (Number.isNaN(parsedDate.getTime())) return 'Not available'

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(parsedDate)
}

export const formatTime = (time) => {
  if (!Number.isFinite(time) || time <= 0) {
    return 'Not available'
  }

  const hours = Math.floor(time / 60)
  const minutes = time % 60

  if (hours === 0) return `${minutes}min`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}min`
}
