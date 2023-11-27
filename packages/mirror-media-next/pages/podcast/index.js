import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { HeaderSkeleton } from '../../components/header'
import Layout from '../../components/shared/layout'
import ShareHeader from '../../components/shared/share-header'
import { API_TIMEOUT, URL_STATIC_PODCAST_LIST } from '../../config/index.mjs'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'

/**
 * @typedef {import('../../components/shared/share-header').HeaderData} HeaderData
 */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 46px;
`

const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #054f77;
  padding: 28px 0 8px;

  ${({ theme }) => theme.breakpoint.xl} {
    font-weight: 700;
    font-size: 28px;
    padding: 41px 0 12px;
  }
`

export default function Podcast() {
  const [podcastList, setPodcastList] = useState([])

  /** @type {[HeaderData,import('react').Dispatch<HeaderData>]} */
  const [headerData, setHeaderData] = useState(null)
  const [isHeaderDataLoaded, setIsHeaderDataLoaded] = useState(false)

  useEffect(() => {
    let ignore = false

    const fetchPodcastList = async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: URL_STATIC_PODCAST_LIST,
          timeout: API_TIMEOUT,
        })

        return data
      } catch (err) {
        console.log(
          JSON.stringify({
            severity: 'WARNING',
            message: `Unable fetch podcast list in Podcast page`,
          })
        )
        return []
      }
    }
    fetchPodcastList().then((res) => {
      if (!ignore) {
        setPodcastList(res)
      }
    })
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    /**
     * @returns {Promise<HeaderData>}
     */
    const fetchHeaderData = async () => {
      try {
        const data = await fetchHeaderDataInDefaultPageLayout()

        return data
      } catch (err) {
        console.log(
          JSON.stringify({
            severity: 'WARNING',
            message: `Unable fetch header data in 404 page`,
          })
        )
        return {
          sectionsData: [],
          topicsData: [],
        }
      }
    }
    fetchHeaderData().then((res) => {
      setHeaderData(res)
      setIsHeaderDataLoaded(true)
    })
  }, [])

  console.log(podcastList)

  return (
    <Layout header={{ type: 'empty' }} footer={{ type: 'empty' }}>
      <>
        {isHeaderDataLoaded ? (
          <ShareHeader pageLayoutType="default" headerData={headerData} />
        ) : (
          <HeaderSkeleton />
        )}
        <PageWrapper>
          <Title>Podcast</Title>
        </PageWrapper>
      </>
    </Layout>
  )
}
