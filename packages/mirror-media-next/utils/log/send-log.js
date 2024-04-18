const sendLog = (log, target = '/api/tracking') => {
  const blob = new Blob([JSON.stringify(log)], {
    type: 'application/json; charset=UTF-8',
  })
  navigator.sendBeacon(target, blob)
}

const sendErrorLog = (log) => sendLog(log, '/api/error-report')

export { sendLog, sendErrorLog }
