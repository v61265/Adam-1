import Bowser from 'bowser'
import { transformTimeDataIntoSlashFormat } from '../../index'
const generateUserBehaviorLogInfo = (
  eventType,
  pathname = '',
  payload = {}
) => {
  const {
    memberType = 'not-member',
    userEmail = '',
    firebaseId = '',
    isMemberArticle = false,
  } = payload
  const userAgent = window?.navigator?.userAgent
  const triggerEvent = {
    'event-type': eventType,
    datetime: transformTimeDataIntoSlashFormat(new Date().toISOString(), true),
  }
  const clientInfo = {
    ip: '',
    userInfo: {
      'member-type': memberType,
      email: userEmail,
      'firebase-id': firebaseId,
    },
    browser: getBrowserInfo(userAgent),
    device: getDeviceInfo(userAgent),
    'is-in-app-browser': detectIsInApp(userAgent),
    'screen-size': getWindowSizeInfo(),
  }
  const pageInfo = {
    referral: document.referrer,
    'page-url': window.location.href,
    'pate-type': getFormattedPageType(pathname, isMemberArticle),
  }

  if (pathname.startsWith('/story/')) {
    pageInfo['story-slug'] = pathname.split('/story/')?.[1] ?? ''
  }
  return { triggerEvent, clientInfo, pageInfo }
}

function getBrowserInfo(userAgent = '') {
  if (!userAgent) {
    return {
      name: '',
      version: '',
    }
  }
  const browser = Bowser.getParser(userAgent)
  const browserInfo = browser.getBrowser()
  return browserInfo
}
function getDeviceInfo(userAgent = '') {
  if (!userAgent) {
    return {
      name: '',
      version: '',
    }
  }
  const browser = Bowser.getParser(userAgent)
  const deviceInfo = browser.getOS()
  return {
    name: deviceInfo?.name,
    version: deviceInfo?.version,
  }
}
/**
 *  Inspired by https://github.com/f2etw/detect-inapp
 */
function detectIsInApp(userAgent = '') {
  if (!userAgent) {
    return false
  }
  const rules = [
    'WebView',
    '(iPhone|iPod|iPad)(?!.*Safari/)',
    'Android.*(wv|.0.0.0)',
  ]
  const regex = new RegExp(`(${rules.join('|')})`, 'ig')
  return Boolean(userAgent.match(regex))
}
function getWindowSizeInfo() {
  return {
    width: document.documentElement.clientWidth || document.body.clientWidth,
    height: document.documentElement.clientHeight || document.body.clientHeight,
  }
}
function getFormattedPageType(pathname = '', isPremiumStory = false) {
  switch (true) {
    case pathname.startsWith('/') && pathname.length === 1:
      return 'index'

    case pathname.startsWith('/story/') && isPremiumStory:
      return 'premium-story'

    case pathname.startsWith('/story/') && !isPremiumStory:
      return 'story'

    case pathname.startsWith('/external/'):
      return 'external'

    case pathname.startsWith('/topic/'):
      return 'topic'

    case pathname.startsWith('/video/'):
      return 'video'

    case pathname.startsWith('/section/') ||
      pathname.startsWith('/premiumsection/') ||
      pathname.startsWith('/externals/'):
      return 'section'

    case pathname.startsWith('/category/') ||
      pathname.startsWith('/video_category/'):
      return 'category'

    default:
      return 'other'
  }
}

export { generateUserBehaviorLogInfo }
