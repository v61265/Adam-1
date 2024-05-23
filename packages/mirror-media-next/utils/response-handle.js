import { logAxiosError } from './log/shared'

/**
 * @template {import('axios').AxiosResponse['data']} T
 * @template {PromiseSettledResult<T>} U
 * @template V
 *
 * @param {U} response
 * @param {(value: T | undefined) => V} dataHandler
 * @param {Parameters<typeof logAxiosError>[1]} errorMessage
 * @param {Parameters<typeof logAxiosError>[2]} [traceObject]
 */
const handleAxiosResponse = (
  response,
  dataHandler,
  errorMessage,
  traceObject
) => {
  if (response.status === 'fulfilled') {
    return dataHandler(response.value)
  } else if (response.status === 'rejected') {
    logAxiosError(response.reason, errorMessage, traceObject)
  }
  return dataHandler(undefined)
}

export { handleAxiosResponse }
