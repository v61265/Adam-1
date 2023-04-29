import errors from '@twreporter/errors'
import Link from 'next/link'
import styled from 'styled-components'

import client from '../../apollo/apollo-client'
import { fetchSpecials } from '../../apollo/query/magazines'

import MagazinePlatforms from '../../components/magazine/magazine-platforms'
import MagazineSpecials from '../../components/magazine/magazine-specials'

const Section = styled.div`
  padding: 48px 0;
  ${({ theme }) => theme.breakpoint.xl} {
    padding: 60px 0;
  }
`
const Page = styled.div`
  background-color: #fffff;
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

export default function Magazine({ specials }) {
  const books = Object.keys(mockData)

  return (
    <Page>
      <Section>
        <Title>
          當期<span>動態雜誌</span>
        </Title>
        <ul>
          {books.map((book) => {
            const issues = Object.keys(mockData[book])

            return issues.map((issue) => (
              <li key={issue}>
                <Link
                  href={`/magazine/Book_${book}/${book}${issue}-Publish`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {`Book ${book}, Issue ${issue}`}
                </Link>
              </li>
            ))
          })}
        </ul>
      </Section>

      <Section>
        <Title>
          近期<span>動態雜誌</span>
        </Title>
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
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps() {
  let globalLogFields = {}

  const responses = await Promise.allSettled([
    client.query({
      query: fetchSpecials,
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
        'Error occurs while getting magazine/special page data'
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

  const props = {
    specials,
  }

  return { props }
}

const mockData = {
  A: {
    266: {
      title: 'Book A, Issue 266',
      content: 'This is the content for Book A, Issue 1.',
    },
    267: {
      title: 'Book A, Issue 267',
      content: 'This is the content for Book A, Issue 2.',
    },
  },
  B: {
    266: {
      title: 'Book B, Issue 266',
      content: 'This is the content for Book B, Issue 1.',
    },
    267: {
      title: 'Book B, Issue 267',
      content: 'This is the content for Book B, Issue 2.',
    },
  },
}
