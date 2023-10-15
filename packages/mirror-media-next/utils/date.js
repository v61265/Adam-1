/**
 *
 * @param {string | number | Date} date
 * @param {{startDate: string | number | Date, endDate: string | number | Date}} dateRange
 * @returns {boolean}
 */
export function isDateInsideDatesRange(date, dateRange) {
  const currentDate = new Date(date)
  const startDate = new Date(dateRange.startDate)
  const endDate = new Date(dateRange.endDate)

  return currentDate >= startDate && currentDate <= endDate
}
