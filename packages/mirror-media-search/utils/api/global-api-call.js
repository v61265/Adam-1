/**
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {{[key: string]: () => Promise<void>}} actions
 */

import CustomError from './custom-error.js'

export default async function globalAPICall(req, res, actions) {
  try {
    const method = req.method
    // check an action exists with request.method else throw method not allowed
    if (!Object.keys(actions).includes(method)) {
      throw new CustomError('Method not allowed', 405)
    }
    // run the action matching the request.method
    await actions[method]()
  } catch (error) {
    console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
    if (error instanceof CustomError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
