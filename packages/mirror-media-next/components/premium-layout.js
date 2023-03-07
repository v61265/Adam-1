import React from 'react'
import Header from './header'

/**
 *
 * @param {Object} props
 * @param {import('../type').Section[]} props.sectionsData
 * @param {import('../type').Topic[]} props.topicsData
 * @param {React.ReactNode} props.children
 * @returns {React.ReactElement}
 */
export default function PremiumLayout({
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
