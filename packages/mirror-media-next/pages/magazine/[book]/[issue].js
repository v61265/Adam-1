import errors from '@twreporter/errors'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styled from 'styled-components'

import client from '../../../apollo/apollo-client'
import { fetchWeeklys } from '../../../apollo/query/magazines'

const Page = styled.div`
  padding: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
  }
`

export default function BookBIssuePublish({ weeklys }) {
  const router = useRouter()
  const { book, issue } = router.query
  const iframeSrc = `https://storage.googleapis.com/mm-magazine/${book}/${issue}/index.html`

  // Check if iframeSrc is valid, if not, redirect to /404 page

  useEffect(() => {
    const validSrcs = weeklys.map((weekly) => {
      const issueNumber = weekly.slug.match(/\d+/)[0]
      const bookLetter = weekly.slug.endsWith('A本') ? 'A' : 'B'
      return `https://storage.googleapis.com/mm-magazine/Book_${bookLetter}/${bookLetter}${issueNumber}-Publish/index.html`
    })

    if (!validSrcs.includes(iframeSrc)) {
      router.push('/404')
    }
  }, [weeklys, iframeSrc, router])

  return (
    <Page>
      <iframe src={iframeSrc} />
    </Page>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps() {
  let globalLogFields = {}

  const responses = await Promise.allSettled([
    client.query({
      query: fetchWeeklys,
    }),
  ])

  const handledResponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      return response.value.data
    } else if (response.status === 'rejected') {
      const { graphQLErrors, clientErrors, networkError } = response.reason
      const annotatingError = errors.helpers.wrap(
        response.reason,
        'UnhandledError',
        'Error occurs while getting magazine issue page data'
      )

      console.log(
        JSON.stringify({
          severity: 'ERROR',
          message: errors.helpers.printAll(
            annotatingError,
            {
              withStack: true,
              withPayload: true,
            },
            0,
            0
          ),
          debugPayload: {
            graphQLErrors,
            clientErrors,
            networkError,
          },
          ...globalLogFields,
        })
      )
      return
    }
  })

  const weeklys = handledResponses[0]?.magazines || []

  return {
    props: {
      weeklys,
    },
  }
}
