/**
 * Client-only
 * @returns {'ios' | 'android' | 'non-mobile'}
 */
export function detectMobileOs() {
  const userAgent = navigator.userAgent

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios'
  } else if (/android/i.test(userAgent)) {
    // Redirect to the Google Play Store
    return 'android'
  } else {
    return 'non-mobile'
  }
}

/**
 * Client-only,
 * From [mirror-media-nuxt](https://github.com/mirror-media/mirror-media-nuxt/blob/5a1b4d0b832260064670b83f353d6c251993837b/plugins/user-behavior-log/util/is-in-app-browser.js#L1)
 * @returns boolean
 */
export function isInAppBrowser() {
  const userAgent = navigator.userAgent
  const rules = [
    'WebView',
    '(iPhone|iPod|iPad)(?!.*Safari/)',
    'Android.*(wv|.0.0.0)',
  ]
  const regex = new RegExp(`(${rules.join('|')})`, 'ig')
  return Boolean(userAgent.match(regex))
}
