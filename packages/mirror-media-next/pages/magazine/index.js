import Head from 'next/head'
import errors from '@twreporter/errors'
import styled from 'styled-components'

import client from '../../apollo/apollo-client'
import { GCP_PROJECT_ID } from '../../config/index.mjs'
import { fetchSpecials, fetchWeeklys } from '../../apollo/query/magazines'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'

import MagazinePlatforms from '../../components/magazine/magazine-platforms'
import MagazineSpecials from '../../components/magazine/magazine-specials'
import MagazineWeeklys from '../../components/magazine/magazine-weeklys'
import MagazineFeatures from '../../components/magazine/magazine-featured-weeklys'
import Layout from '../../components/shared/layout'

const Section = styled.div`
  padding: 48px 0;
  ${({ theme }) => theme.breakpoint.xl} {
    padding: 60px 0;
  }
`
const Page = styled.div`
  background-color: #ffffff;
  & ${Section}:nth-child(even) {
    background-color: #f2f2f2;
  }
`

const Title = styled.h2`
  font-weight: 500;
  font-size: 28px;
  line-height: 39px;
  text-align: center;
  letter-spacing: 1px;
  color: #4a4a4a;
  span {
    color: #054f77;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 32px;
    line-height: 45px;
    letter-spacing: 1.2px;
  }
`

export default function Magazine({
  specials = [],
  weeklys = [],
  sectionsData = [],
  topicsData = [],
}) {
  // Sort the weekly magazines
  const sortedMagazines = weeklys?.length
    ? weeklys.sort((a, b) => {
        const [aIssueNumber, aVersion] = a.slug.match(/(\d+)期-(\w)本/).slice(1)
        const [bIssueNumber, bVersion] = b.slug.match(/(\d+)期-(\w)本/).slice(1)

        if (Number(bIssueNumber) !== Number(aIssueNumber)) {
          return Number(bIssueNumber) - Number(aIssueNumber)
        }

        // If issue number is the same, sort by version in ascending order
        if (bVersion !== aVersion) {
          return aVersion.localeCompare(bVersion)
        }

        // If version is also the same, maintain the original order
        return 0
      })
    : []

  return (
    <Layout
      header={{
        type: 'default',
        data: { sectionsData: sectionsData, topicsData },
      }}
    >
      <>
        <Head>
          <title>鏡週刊 Mirror Media｜動態雜誌</title>
        </Head>
        <Page>
          <Section>
            <Title>
              當期<span>動態雜誌</span>
            </Title>
            <MagazineFeatures features={sortedMagazines.slice(0, 2)} />
          </Section>

          <Section>
            <Title>
              近期<span>動態雜誌</span>
            </Title>
            <MagazineWeeklys weeklys={sortedMagazines.slice(2)} />
          </Section>

          <Section>
            <Title>購買線上雜誌</Title>
            <MagazinePlatforms />
          </Section>

          <Section>
            <Title>特刊</Title>
            <MagazineSpecials specials={specials} />
          </Section>
        </Page>
      </>
    </Layout>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ req }) {
  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  const responses = await Promise.allSettled([
    client.query({
      query: fetchSpecials,
    }),
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
        'Error occurs while getting magazine page data'
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

  const specials = handledResponses[0]?.magazines || []
  const weeklys = handledResponses[1]?.magazines || []

  // Fetch header data
  let sectionsData = []
  let topicsData = []
  try {
    const headerData = await fetchHeaderDataInDefaultPageLayout()
    if (Array.isArray(headerData.sectionsData)) {
      sectionsData = headerData.sectionsData
    }
    if (Array.isArray(headerData.topicsData)) {
      topicsData = headerData.topicsData
    }
  } catch (err) {
    const annotatingAxiosError = errors.helpers.annotateAxiosError(err)
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatingAxiosError, {
          withStack: true,
          withPayload: true,
        }),
        ...globalLogFields,
      })
    )
  }

  return {
    props: {
      specials,
      weeklys,
      sectionsData,
      topicsData,
    },
  }
}
