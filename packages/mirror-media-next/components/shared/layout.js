import ShareHeader from './share-header'
import Footer from './footer'
import CustomHead from './custom-head'

/**
 * @typedef {Object} Header
 * @property {import('./share-header').HeaderType} type
 * @property {import('./share-header').HeaderData} [data]
 *
 * @typedef {import('./custom-head').HeadProps} Head
 *
 * @typedef {Object} Footer
 * @property {import('./footer').FooterType} type
 */

/**
 * @param {Object} props
 * @param {Head} [props.head]
 * @param {Header} props.header
 * @param {Footer} props.footer
 * @param {JSX.Element} props.children
 * @returns
 */
export default function Layout({ head, header, footer, children }) {
  return (
    <>
      <CustomHead
        title={head?.title}
        description={head?.description}
        imageUrl={head?.imageUrl}
      />
      <ShareHeader pageLayoutType={header.type} headerData={header.data} />
      {children}
      <Footer footerType={footer.type} />
    </>
  )
}
