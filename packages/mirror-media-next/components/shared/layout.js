import ShareHeader from '../header/share-header'
import Footer from './footer'
import CustomHead from './custom-head'
import GDPRNotification from '../gdpr'
import IdleTimeoutModal from '../idle-modal/idle-timeout-modal'

/**
 * @typedef {Object} Header
 * @property {import('../header/share-header').HeaderType} type
 * @property {import('../header/share-header').HeaderData} [data]
 *
 * @typedef {import('./custom-head').HeadProps} Head
 *
 * @typedef {Object} Footer
 * @property {import('./footer').FooterType} type
 */

/**
 * @param {Object} props
 * @param {Head} [props.head] - object that CustomHead needs to set the html meta
 * @param {Header} props.header - object that ShareHeader needs to render the specific type and the content
 * @param {Footer} props.footer - object that Footer needs to render the specific type
 * @param {React.ReactNode} props.children - main content of the page
 * @returns {React.ReactElement}
 */
export default function Layout({ head, header, footer, children }) {
  return (
    <>
      <CustomHead
        title={head?.title}
        description={head?.description}
        imageUrl={head?.imageUrl}
        skipCanonical={head?.skipCanonical}
        pageType={head?.pageType}
        pageSlug={head?.pageSlug}
      />
      <ShareHeader pageLayoutType={header.type} headerData={header.data} />
      <IdleTimeoutModal />
      {children}
      <GDPRNotification />
      <Footer footerType={footer.type} />
    </>
  )
}
