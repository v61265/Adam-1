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

export function isInWebView() {
  const userAgent = window.navigator.userAgent || ''
  // @ts-ignore
  const iOSWebView = !!window.navigator.standalone
  const androidWebView =
    userAgent.includes('wv') ||
    (userAgent.includes('Android') && userAgent.includes('Version/'))
  const isFacebookApp = userAgent.includes('FBAN') || userAgent.includes('FBAV')
  const isInstagramApp = userAgent.includes('Instagram')

  return iOSWebView || androidWebView || isFacebookApp || isInstagramApp
}
