import errors from '@twreporter/errors'
import styled from 'styled-components'

import client from '../../apollo/apollo-client'
import ExternalArticles from '../../components/external/external-articles'
import { GCP_PROJECT_ID } from '../../config/index.mjs'
import ShareHeader from '../../components/shared/share-header'
import Footer from '../../components/footer'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'

import {
  fetchExternalsByPartnerSlug,
  fetchExternalCounts,
} from '../../apollo/query/externals'
import { fetchPartnerBySlug } from '../../apollo/query/partner'

/**
 * @typedef {import('../../type/theme').Theme} Theme
 */

const PartnerContainer = styled.main`
  width: 320px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoint.md} {
    width: 672px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 1024px;
    padding: 0;
  }
`
const PartnerTitle = styled.h1`
  margin: 20px 0 16px 16px;
  font-size: 16px;
  line-height: 1.15;
  font-weight: 500;

  color: ${({ theme }) => theme.color.brandColor.lightBlue};

  ${({ theme }) => theme.breakpoint.md} {
    margin: 20px 0 24px;
    font-size: 20.8px;
    font-weight: 600;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    margin: 24px 0 28px;
    font-size: 28px;
  }
`

const RENDER_PAGE_SIZE = 12

/**
 * @typedef {import('../../apollo/fragments/external').External} External
 * @typedef {import('../../apollo/fragments/partner').Partner} Partner
 */

/**
 * @param {Object} props
 * @param {External[]} props.externals
 * @param {number} props.externalsCount
 * @param {Object} props.headerData
 * @param {Partner} props.partner
 * @returns {React.ReactElement}
 */

export default function ExternalPartner({
  externalsCount,
  externals,
  partner,
  headerData,
}) {
  return (
    <>
      <ShareHeader pageLayoutType="default" headerData={headerData} />
      <PartnerContainer>
        <PartnerTitle>{partner?.name}</PartnerTitle>
        <ExternalArticles
          externalsCount={externalsCount}
          externals={externals}
          partner={partner}
          renderPageSize={RENDER_PAGE_SIZE}
        />
      </PartnerContainer>
      <Footer />
    </>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ query, req }) {
  const partnerSlug = query.partnerSlug
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
      query: fetchExternalsByPartnerSlug,
      variables: {
        take: RENDER_PAGE_SIZE * 2,
        skip: 0,
        orderBy: { publishedDate: 'desc' },
        filter: {
          state: { equals: 'published' },
          partner: { slug: { equals: partnerSlug } },
        },
      },
    }),
    client.query({
      query: fetchExternalCounts,
      variables: {
        filter: {
          state: { equals: 'published' },
          partner: { slug: { equals: partnerSlug } },
        },
      },
    }),
    client.query({
      query: fetchPartnerBySlug,
      variables: { slug: partnerSlug },
    }),
  ])

  const handledResponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      return response.value
    } else if (response.status === 'rejected') {
      const { graphQLErrors, clientErrors, networkError } = response.reason
      const annotatingError = errors.helpers.wrap(
        response.reason,
        'UnhandledError',
        'Error occurs while getting section page data'
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

  /** @type {External[]} */
  const externals =
    'data' in handledResponses[0]
      ? handledResponses[0]?.data?.externals || []
      : []

  /** @type {number} */
  const externalsCount =
    'data' in handledResponses[1]
      ? handledResponses[1]?.data?.externalsCount || 0
      : 0

  /** @type {Partner} */
  const partner =
    'data' in handledResponses[2]
      ? handledResponses[2]?.data?.partner || {}
      : {}

  // fetch header data
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

  const props = {
    externalsCount,
    externals,
    partner,
    headerData: { sectionsData, topicsData },
  }

  return { props }
}
