import { SESSION_COOKIE_NAME } from '../config/index.mjs'
import { getAdminAuth } from '../firebase/admin'
import { URLSearchParams } from 'node:url'

/**
 * @typedef {import('querystring').ParsedUrlQuery} ParsedUrlQuery
 * @typedef {import('next').PreviewData} PreviewData
 */

/**
 * @typedef {Record<string, any>} Dictionary
 */

/**
 * should be used on SSR page which redirects user to `destination` route if authed
 *
 * @template {Dictionary} P
 * @template {ParsedUrlQuery} Q
 * @template {PreviewData} D
 * @type {() => (propGetter?: import('next').GetServerSideProps<P, Q, D>) => import('next').GetServerSideProps<P, Q, D>}
 *
 */
const redirectToDestinationWhileAuthed =
  () => (getServerSidePropsFunc) => async (ctx) => {
    const { req, query } = ctx
    const sessionCookie = req.cookies[SESSION_COOKIE_NAME] ?? ''

    try {
      await getAdminAuth().verifySessionCookie(sessionCookie)

      /**
       * user with valid session cookie
       */
      /** @type {string} */
      let destination = '/section/member'

      if ('destination' in query) {
        const dest = query.destination
        destination = Array.isArray(dest) ? dest.join(',') : dest
      }

      const searchParamsObject = new URLSearchParams(query)
      searchParamsObject.delete('destination')
      const searchParams = searchParamsObject.toString()

      if (searchParams) {
        destination = `${destination}?${searchParams}`
      }

      return {
        redirect: {
          statusCode: 307,
          destination,
        },
      }
    } catch (err) {
      /**
       * user without valid session cookie or other errors
       */

      if (!('codePrefix' in err) || err.codePrefix !== 'auth') {
        // error which is not FirebaseAuthError
        console.error(
          JSON.stringify({
            severity: 'ERROR',
            message: err.message,
          })
        )
      }

      let props = /** @type {P | Promise<P>} */ ({}) // type cast in JSDoc, ref: https://stackoverflow.com/a/75459130
      if (getServerSidePropsFunc) {
        const composedProps = await getServerSidePropsFunc(ctx)

        if (composedProps) {
          if ('props' in composedProps) {
            props = composedProps.props

            return {
              ...composedProps,
              props,
            }
          }
          if ('notFound' in composedProps || 'redirect' in composedProps) {
            return { ...composedProps }
          }
        }
      }

      return {
        props,
      }
    }
  }

export default redirectToDestinationWhileAuthed
