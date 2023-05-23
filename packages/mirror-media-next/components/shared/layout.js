import ShareHeader from './share-header'
import Footer from './footer'

/**
 * @typedef {Object} Header
 * @property {import('./share-header').HeaderType} type
 * @property {import('./share-header').HeaderData} [data]
 */

/**
 * @param {Object} props
 * @param {Header} props.header
 * @param {JSX.Element} props.children
 * @returns
 */
export default function Layout({ header, children }) {
  return (
    <>
      <ShareHeader pageLayoutType={header.type} headerData={header.data} />
      {children}
      <Footer />
    </>
  )
}
