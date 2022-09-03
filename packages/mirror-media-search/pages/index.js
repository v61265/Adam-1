import axios from 'axios'
import styled from 'styled-components'
import Header from '../components/shared/mirror-media-header-old'
import { RedirectUrlContext } from '../context/redirectUrl'
import {
  URL_STATIC_COMBO_SECTIONS,
  URL_MIRROR_MEDIA,
  API_TIMEOUT,
  API_PROTOCOL,
  API_HOST,
  API_PORT,
} from '../config'

const FakeElement = styled.div`
  height: 100vh;
  background-color: ${({ color }) => color};
`
export default function Home({ sectionsData, topicsData, redirectUrl }) {
  return (
    <>
      <RedirectUrlContext.Provider value={redirectUrl}>
        <Header sectionsData={sectionsData} topicsData={topicsData} />
        <div>Hello Mirror Media Search</div>
        <FakeElement color="lightblue" />
        <FakeElement color="#00bbb3" />
      </RedirectUrlContext.Provider>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const responses = await Promise.allSettled([
      axios({
        method: 'get',
        url: URL_STATIC_COMBO_SECTIONS,
        timeout: API_TIMEOUT,
      }),
      axios({
        method: 'get',
        url: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/combo?endpoint=topics`,
        timeout: API_TIMEOUT,
      }),
    ])

    const props = {
      sectionsData: responses[0].value.data._items,
      topicsData: responses[1].value.data._endpoints.topics._items,
      redirectUrl: URL_MIRROR_MEDIA,
    }

    console.log(
      JSON.stringify({
        severity: 'DEBUG',
        message: `Successfully fetch sections and topics from ${URL_STATIC_COMBO_SECTIONS} and ${API_PROTOCOL}://${API_HOST}:${API_PORT}/combo?endpoint=topics`,
      })
    )
    return { props }
  } catch (error) {
    console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
    return {
      props: {
        sectionsData: [],
        topicsData: [],
        redirectUrl: URL_MIRROR_MEDIA,
      },
    }
  }
}
