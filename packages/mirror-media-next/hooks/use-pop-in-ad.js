import { useEffect } from 'react'

/**
 * Pop In ad need to insert the script to activate multiple Pop In ad component,
 * so the script need to wait until all component is mounted.
 * To render a pop in ad, use ~/components/ads/pop-in/pop-in-ad.js with specific id.
 */
export default function usePopInAd() {
  useEffect(() => {
    const popInScript = document.createElement('script')
    popInScript.async = true
    popInScript.src =
      window.location.protocol + '//api.popin.cc/searchbox/mirrormedia_tw.js'
    document.head.appendChild(popInScript)

    return () => {
      popInScript?.remove()
    }
  }, [])
}
