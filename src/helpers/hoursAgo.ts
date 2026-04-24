export function hoursAgo(hours: number, timeZone = "UTC") {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}
