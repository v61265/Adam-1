/**
 * Custom Firebase Email handler
 * @see https://firebase.google.com/docs/auth/custom-email-handler
 */

import styled from 'styled-components'
import { GCP_PROJECT_ID } from '../config/index.mjs'
import { setPageCache } from '../utils/cache-setting'
import LayoutFull from '../components/shared/layout-full'
import BodyEmailVerification from '../components/email-handler/body-email-verification'

const RESET_PASSWORD = 'resetPassword'
const RECOVER_EMAIL = 'recoverEmail'
const VERIFY_EMAIL = 'verifyEmail'
const MODE = /** @type {const} */ ({
  RESET_PASSWORD,
  RECOVER_EMAIL,
  VERIFY_EMAIL,
})

const Container = styled.div`
  flex-grow: 1;

  background-color: #fff;
  ${({ theme }) => theme.breakpoint.md} {
    background-color: #f2f2f2;
  }
`

/**
 * @typedef {Object} PageProps
 * @property {RESET_PASSWORD | VERIFY_EMAIL}  mode
 */

/**
 * @param {PageProps} props
 */
export default function EmailHandler({ mode }) {
  const getBodyByMode = () => {
    switch (mode) {
      case MODE.RESET_PASSWORD:
        return <>This is reset password body</>
      case MODE.VERIFY_EMAIL:
        return <BodyEmailVerification />
    }
  }

  const jsx = getBodyByMode()

  return (
    <LayoutFull header={{ type: 'default' }} footer={{ type: 'default' }}>
      <Container>{jsx}</Container>
    </LayoutFull>
  )
}

/**
 * @type {import('next').GetServerSideProps<PageProps>}
 */
export const getServerSideProps = async ({ req, res, query }) => {
  setPageCache(res, { cachePolicy: 'no-store' }, req.url)
  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  const rawMode = query.mode
  const mode = Array.isArray(rawMode) ? '' : rawMode

  if ([RESET_PASSWORD, VERIFY_EMAIL].includes(mode) === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      mode: /** @type {RESET_PASSWORD | VERIFY_EMAIL} */ (mode),
    },
  }
}
