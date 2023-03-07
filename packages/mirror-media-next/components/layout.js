import Header from './header'
import React from 'react'

/**
 *
 * @param {Object} props
 * @param {import('../type').Section[]} props.sectionsData
 * @param {import('../type').Topic[]} props.topicsData
 * @param {React.ReactNode} props.children
 * @returns {React.ReactElement}
 */
export default function Layout({
  sectionsData = [],
  topicsData = [],
  children,
}) {
  return (
    <>
      <Header sectionsData={sectionsData} topicsData={topicsData} />
      {children}
    </>
  )
}
