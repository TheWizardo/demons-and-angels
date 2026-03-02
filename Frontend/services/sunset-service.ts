// sunset-service.ts
export type Geo = { lat: number; lon: number }

function degToRad(d: number) { return d * Math.PI / 180 }
function radToDeg(r: number) { return r * 180 / Math.PI }

function dayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 1)
  return Math.floor((date.getTime() - start.getTime()) / 86400000) + 1
}

export function getSunset(date: Date, geo: Geo): Date {
  const { lat, lon } = geo
  const N = dayOfYear(date)

  const gamma = (2 * Math.PI / 365) * (N - 1)

  const eqTime =
    229.18 * (
      0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma)
    )

  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma)

  const zenith = degToRad(90.833)
  const latRad = degToRad(lat)

  const cosH =
    (Math.cos(zenith) - Math.sin(latRad) * Math.sin(decl)) /
    (Math.cos(latRad) * Math.cos(decl))

  // Polar edge cases (optional safety)
  if (cosH <= -1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
  }
  if (cosH >= 1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  }

  const H = Math.acos(cosH)
  const Hdeg = radToDeg(H)

  const solarNoon = 720 - 4 * lon - eqTime
  const sunsetUTCmin = solarNoon + 4 * Hdeg

  const utcMidnight = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  return new Date(utcMidnight + sunsetUTCmin * 60000)
}

export function isAfterSunset(now: Date, geo: Geo) {
  return now >= getSunset(now, geo)
}