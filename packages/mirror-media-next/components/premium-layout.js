import React from 'react'
import PremiumHeader from './premium-header'

/**
 *
 * @param {Object} props
 * @param {import('../type').Section[]} props.sectionsData
 * @param {import('../type').Topic[]} props.topicsData
 * @param {React.ReactNode} props.children
 * @returns {React.ReactElement}
 */
export default function PremiumLayout({ premiumHeaderData, children }) {
  return (
    <>
      <PremiumHeader premiumHeaderData={premiumHeaderData} />
      {children}
    </>
  )
}
