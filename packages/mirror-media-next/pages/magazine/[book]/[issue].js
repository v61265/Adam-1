import { useRouter } from 'next/router'
import styled from 'styled-components'

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

export default function BookBIssuePublish() {
  const router = useRouter()
  const { book, issue } = router.query
  return (
    <Page>
      <iframe
        src={`https://storage.googleapis.com/mm-magazine/${book}/${issue}/index.html`}
      />
    </Page>
  )
}
