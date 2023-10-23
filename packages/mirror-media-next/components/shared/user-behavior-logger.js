import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import debounce from 'debounce'
import { sendLog } from '../../utils/log/send-log'
import { useMembership } from '../../context/membership'
const MOCK_QUERY_PAGE_VIEW = {
  browser: { name: 'Chrome', version: '118.0.0.0' },
  'is-in-app-browser': false,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'client-os': { name: 'macOS', version: '10.15.7' },
  'curr-url': 'http://localhost:3000/',
  datetime: '2023.10.19 17:11:06',
  referrer: '',
  'target-text': '',
  'target-window-size': { width: 1905, height: 938 },
  'client-id': 'mock-client-id',
  'current-runtime-start': '2023.10.19 17:11:06',
  'session-id': 'mock-session-id',
  category: 'whole-site',
  description: '',
  'event-type': 'pageview',
  'page-type': 'index',
  'member-info-firebase': { userSignInInfo: {}, user: {} },
  'member-info-israfel': { basicInfo: {} },
}

const MOCK_QUERY_EXIT = {
  browser: { name: 'Chrome', version: '118.0.0.0' },
  'is-in-app-browser': false,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'client-os': { name: 'macOS', version: '10.15.7' },
  'curr-url': 'http://localhost:3000/',
  datetime: '2023.10.19 17:11:06',
  referrer: '',
  'target-text': '',
  'target-window-size': { width: 1905, height: 938 },
  'client-id': 'mock-client-id',
  'current-runtime-start': '2023.10.19 17:11:06',
  'session-id': 'mock-session-id',
  category: 'whole-site',
  description: '',
  'event-type': 'exit',
  'page-type': 'index',
  'member-info-firebase': { userSignInInfo: {}, user: {} },
  'member-info-israfel': { basicInfo: {} },
}
const MOCK_QUERY_SCROLL = {
  browser: { name: 'Chrome', version: '118.0.0.0' },
  'is-in-app-browser': false,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'client-os': { name: 'macOS', version: '10.15.7' },
  'curr-url': 'http://localhost:3000/',
  datetime: '2023.10.19 17:11:06',
  referrer: '',
  'target-text': '',
  'target-window-size': { width: 1905, height: 938 },
  'client-id': 'mock-client-id',
  'current-runtime-start': '2023.10.19 17:11:06',
  'session-id': 'mock-session-id',
  category: 'whole-site',
  description: '',
  'event-type': 'scroll',
  'page-type': 'index',
  'member-info-firebase': { userSignInInfo: {}, user: {} },
  'member-info-israfel': { basicInfo: {} },
}

export default function UserBehaviorLogger() {
  const router = useRouter()
  const pathname = usePathname()
  const { isLogInProcessFinished } = useMembership()

  //pageview event
  useEffect(() => {
    console.log(
      'route change with dependency',
      pathname,
      isLogInProcessFinished
    )
    sendLog(MOCK_QUERY_PAGE_VIEW)
  }, [pathname, isLogInProcessFinished])

  //exit event
  //TODO: prevent beforeunload and beforeHistoryChange trigger at the same time.
  useEffect(() => {
    let ignore = false
    const beforeHistoryChangeEvent = () => {
      console.log('beforeHistoryChangeEvent')
      sendLog(MOCK_QUERY_EXIT)
    }
    const beforeUnloadEvent = () => {
      if (!ignore) {
        console.log('beforeUnloadEvent')
        sendLog(MOCK_QUERY_EXIT)
      }
    }

    router.events.on('beforeHistoryChange', beforeHistoryChangeEvent)
    window.addEventListener('beforeunload', beforeUnloadEvent)
    return () => {
      ignore = true
      window.removeEventListener('beforeunload', beforeUnloadEvent)
      router.events.off('beforeHistoryChange', beforeHistoryChangeEvent)
    }
  }, [router])
  //scroll event
  useEffect(() => {
    let ignore = false

    function detectIsScrollToBottom() {
      const totalPageHeight = document.body.scrollHeight
      const scrollPoint = window.scrollY + window.innerHeight
      return scrollPoint >= totalPageHeight
    }
    const scrollToBottomEvent = () => {
      if (ignore) {
        return
      }
      const isScrollToBottom = detectIsScrollToBottom()
      if (isScrollToBottom) {
        console.log('isScrollToBottom')
        sendLog(MOCK_QUERY_SCROLL)
      } else {
        console.log('is not ScrollToBottom')
      }
    }
    window.addEventListener('scroll', debounce(scrollToBottomEvent, 500))
    return () => {
      ignore = true
      window.removeEventListener('scroll', debounce(scrollToBottomEvent, 500))
    }
  }, [])
  return null
}
