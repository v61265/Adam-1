import axios from 'axios'
import styled from 'styled-components'
import Header from '../components/shared/mirror-media-header-old'
import {
  URL_STATIC_COMBO_SECTIONS,
  API_TIMEOUT,
  API_PROTOCOL,
  API_HOST,
  API_PORT,
} from '../config'

const FakeElement = styled.div`
  height: 100vh;
  background-color: ${({ color }) => color};
`
export default function Home({ sectionsData, topicsData }) {
  return (
    <>
      <Header sectionsData={sectionsData} topicsData={topicsData} />
      <div>Hello Mirror Media Search</div>
      <FakeElement color="lightblue" />
      <FakeElement color="#00bbb3" />
    </>
  )
}

export async function getServerSideProps() {
  try {
    const props = {}

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

    props.sectionsData = responses[0].value.data._items
    props.topicsData = responses[1].value.data._endpoints.topics._items

    console.log(
      JSON.stringify({
        severity: 'DEBUG',
        message: `Successfully fetch sections and topics from ${URL_STATIC_COMBO_SECTIONS} and ${API_PROTOCOL}://${API_HOST}:${API_PORT}/combo?endpoint=topics`,
      })
    )
    return { props }
  } catch (error) {
    console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
    return { props: { sectionsData: [], topicsData: [] } }
  }
}
