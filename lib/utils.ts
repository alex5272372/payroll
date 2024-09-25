export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${(Date.now() - new Date(timestamp).getTime()) / 1000}${
    timeOnly ? '' : 's ago'
  }`
}
