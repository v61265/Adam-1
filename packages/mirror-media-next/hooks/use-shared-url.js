import { useRouter } from 'next/router'

/**
 * @param {string} [url] - url need to be shared. Optional, value will be current page url if not assigned
 * @returns {string}
 */
export default function useSharedUrl(url = '') {
  const { asPath } = useRouter()

  const getSharedUrl = () => {
    let sharedUrl = url
    if (!sharedUrl) {
      const origin =
        typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : 'https://www.mirrormedia.mg'
      const path = asPath
      sharedUrl = `${origin}${path}`
    }
    return sharedUrl
  }
  const sharedUrl = getSharedUrl()
  return sharedUrl
}
