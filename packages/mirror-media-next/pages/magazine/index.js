import Link from 'next/link'
import styled from 'styled-components'
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

export default function Magazine() {
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

const specials = {
  data: {
    magazines: [
      {
        id: '161',
        slug: '《鏡週刊》297期-C本',
        title: '錶霸出列　鐘錶學園的優等生',
        pdfFile: {
          url: '/files/20220615122803-11a0bd3035907e565574d08a89b81a5d.pdf',
        },
        urlOriginal:
          'https://storage.googleapis.com/static-mirrormedia-dev/files/20220615122803-11a0bd3035907e565574d08a89b81a5d.pdf',
        coverPhoto: {
          resized: {
            original:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20220615122934-8851faee9cb8968e7335c6208c3ef9b8.jpg',
            w480: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20220615122934-8851faee9cb8968e7335c6208c3ef9b8-w480.jpg',
            w800: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20220615122934-8851faee9cb8968e7335c6208c3ef9b8-w800.jpg',
            w1200:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20220615122934-8851faee9cb8968e7335c6208c3ef9b8-w1200.jpg',
          },
        },
        type: 'special',
        state: 'published',
        publishedDate: '2022-06-15T04:31:04.000Z',
        createdAt: '2022-06-15T04:28:03.000Z',
        updatedAt: '2022-11-29T16:02:21.159Z',
      },
      {
        id: '173',
        slug: '《鏡週刊》279期-C本',
        title: '虎年新春理財特刊',
        pdfFile: {
          url: '/files/20220720154010-7a660b08907205a69ad72fbc283e2d37.pdf',
        },
        urlOriginal:
          'https://storage.googleapis.com/static-mirrormedia-dev/files/20220720154010-7a660b08907205a69ad72fbc283e2d37.pdf',
        coverPhoto: {
          resized: {
            original:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20220720153537-621087eb3b5a7f5075dc0550e162d5fd.jpg',
            w480: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20220720153537-621087eb3b5a7f5075dc0550e162d5fd-w480.jpg',
            w800: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20220720153537-621087eb3b5a7f5075dc0550e162d5fd-w800.jpg',
            w1200:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20220720153537-621087eb3b5a7f5075dc0550e162d5fd-w1200.jpg',
          },
        },
        type: 'special',
        state: 'published',
        publishedDate: '2022-02-01T07:40:10.000Z',
        createdAt: '2022-03-01T07:40:10.000Z',
        updatedAt: '2022-11-29T16:02:23.965Z',
      },
      {
        id: '172',
        slug: '《鏡週刊》277期-C本',
        title: '酒誌',
        pdfFile: {
          url: '/files/20220720153656-7c5e987a3ec56fc86abdf16e7f0024a5.pdf',
        },
        urlOriginal:
          'https://storage.googleapis.com/static-mirrormedia-dev/files/20220720153656-7c5e987a3ec56fc86abdf16e7f0024a5.pdf',
        coverPhoto: {
          resized: {
            original:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20220720153522-72bbfe8799ade5af38d4e2d8ebb28211.jpg',
            w480: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20220720153522-72bbfe8799ade5af38d4e2d8ebb28211-w480.jpg',
            w800: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20220720153522-72bbfe8799ade5af38d4e2d8ebb28211-w800.jpg',
            w1200:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20220720153522-72bbfe8799ade5af38d4e2d8ebb28211-w1200.jpg',
          },
        },
        type: 'special',
        state: 'published',
        publishedDate: '2022-01-19T07:36:56.000Z',
        createdAt: '2022-01-19T07:36:56.000Z',
        updatedAt: '2022-11-29T16:02:23.654Z',
      },
      {
        id: '112',
        slug: '《鏡週刊》274期-C本',
        title: '瑪法達2022星座大預言',
        pdfFile: {
          url: '/files/20211228171447-998672698e2b6c73ab38e104dd9e6410.pdf',
        },
        urlOriginal:
          'https://storage.googleapis.com/static-mirrormedia-dev/files/20211228171447-998672698e2b6c73ab38e104dd9e6410.pdf',
        coverPhoto: {
          resized: {
            original:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20211228171854-d55c195b51e47c84e877b87e2a472214.jpg',
            w480: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20211228171854-d55c195b51e47c84e877b87e2a472214-w480.jpg',
            w800: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20211228171854-d55c195b51e47c84e877b87e2a472214-w800.jpg',
            w1200:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20211228171854-d55c195b51e47c84e877b87e2a472214-w1200.jpg',
          },
        },
        type: 'special',
        state: 'published',
        publishedDate: '2021-12-29T00:44:39.000Z',
        createdAt: '2021-12-29T00:44:40.000Z',
        updatedAt: '2022-11-29T16:02:05.785Z',
      },
      {
        id: '103',
        slug: '《鏡週刊》271期-C本',
        title: '嚴選2021百大好錶　best buy 101',
        pdfFile: {
          url: '/files/20211207161414-cdbfd217ad14afa0fb7a9dbed387f356.pdf',
        },
        urlOriginal:
          'https://storage.googleapis.com/static-mirrormedia-dev/files/20211207161414-cdbfd217ad14afa0fb7a9dbed387f356.pdf',
        coverPhoto: {
          resized: {
            original:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20211207161604-c51daa776d15519c189770ee9929d3ee.jpg',
            w480: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20211207161604-c51daa776d15519c189770ee9929d3ee-w480.jpg',
            w800: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20211207161604-c51daa776d15519c189770ee9929d3ee-w800.jpg',
            w1200:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20211207161604-c51daa776d15519c189770ee9929d3ee-w1200.jpg',
          },
        },
        type: 'special',
        state: 'published',
        publishedDate: '2021-12-08T03:36:37.000Z',
        createdAt: '2021-12-08T03:36:38.000Z',
        updatedAt: '2022-11-29T16:02:02.935Z',
      },
      {
        id: '102',
        slug: '《鏡週刊》251期-C本',
        title: '東京奧運觀賽指南',
        pdfFile: {
          url: '/files/20211207135521-9109e52e0629cdaf7b7a9785e4331248.pdf',
        },
        urlOriginal:
          'https://storage.googleapis.com/static-mirrormedia-dev/files/20211207135521-9109e52e0629cdaf7b7a9785e4331248.pdf',
        coverPhoto: {
          resized: {
            original:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20211207162543-d1141f297da58af7f04cbc3267796100.jpg',
            w480: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20211207162543-d1141f297da58af7f04cbc3267796100-w480.jpg',
            w800: 'https://storage.googleapis.com/static-mirrormedia-dev/images/20211207162543-d1141f297da58af7f04cbc3267796100-w800.jpg',
            w1200:
              'https://storage.googleapis.com/static-mirrormedia-dev/images/20211207162543-d1141f297da58af7f04cbc3267796100-w1200.jpg',
          },
        },
        type: 'special',
        state: 'published',
        publishedDate: '2021-12-07T08:27:25.000Z',
        createdAt: '2021-12-07T08:27:26.000Z',
        updatedAt: '2022-11-29T16:02:02.615Z',
      },
    ],
  },
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
