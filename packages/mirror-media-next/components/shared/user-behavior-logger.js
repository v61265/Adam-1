import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import debounce from 'debounce'
import { sendLog } from '../../utils/log/send-log'
import { useMembership } from '../../context/membership'

import { generateUserBehaviorLogInfo } from '../../utils/log/user-behavior-log'

export default function UserBehaviorLogger({ isMemberArticle = false }) {
  const router = useRouter()
  const { pathname } = router

  const {
    isLogInProcessFinished,
    memberInfo: { memberType },
    userEmail,
    firebaseId,
  } = useMembership()

  const userBehaviorLogInfoPayload = useMemo(() => {
    return {
      memberType,
      userEmail,
      firebaseId,
      isMemberArticle,
    }
  }, [memberType, userEmail, firebaseId, isMemberArticle])

  //pageview event
  useEffect(() => {
    if (!isLogInProcessFinished) {
      return
    }

    const info = generateUserBehaviorLogInfo(
      'pageview',
      pathname,
      userBehaviorLogInfoPayload
    )
    sendLog(info)
  }, [pathname, isLogInProcessFinished, userBehaviorLogInfoPayload])

  //exit event
  //TODO: prevent beforeunload and beforeHistoryChange trigger at the same time.
  useEffect(() => {
    let ignore = false
    let hasBeforeUnloadEventTriggered = false

    if (!isLogInProcessFinished) {
      return
    }
    const info = generateUserBehaviorLogInfo(
      'exit',
      pathname,
      userBehaviorLogInfoPayload
    )

    const beforeUnloadEvent = () => {
      if (ignore) {
        return
      }
      hasBeforeUnloadEventTriggered = true
      sendLog(info)
    }
    const beforeHistoryChangeEvent = () => {
      if (ignore || hasBeforeUnloadEventTriggered) {
        return
      }
      sendLog(info)
    }
    window.addEventListener('beforeunload', beforeUnloadEvent)
    router.events.on('beforeHistoryChange', beforeHistoryChangeEvent)
    return () => {
      ignore = true
      window.removeEventListener('beforeunload', beforeUnloadEvent)
      router.events.off('beforeHistoryChange', beforeHistoryChangeEvent)
    }
  }, [router, pathname, isLogInProcessFinished, userBehaviorLogInfoPayload])
  //scroll-to-80% event
  useEffect(() => {
    let ignore = false

    if (!isLogInProcessFinished) {
      return
    }
    function detectIsScrollTo80Percent() {
      const totalPageHeight = document.body.scrollHeight
      const scrollPoint = window.scrollY + window.innerHeight
      return scrollPoint >= totalPageHeight * 0.8
    }

    const scrollToBottomEvent = () => {
      if (ignore) {
        return
      }
      const isScrollToBottom = detectIsScrollTo80Percent()
      if (isScrollToBottom) {
        const info = generateUserBehaviorLogInfo(
          'scroll-to-80%',
          pathname,
          userBehaviorLogInfoPayload
        )
        sendLog(info)
      }
    }
    window.addEventListener('scroll', debounce(scrollToBottomEvent, 500))
    return () => {
      ignore = true
      window.removeEventListener('scroll', debounce(scrollToBottomEvent, 500))
    }
  }, [pathname, isLogInProcessFinished, userBehaviorLogInfoPayload])

  //click event
  useEffect(() => {
    let ignore = false
    if (!isLogInProcessFinished) {
      return
    }
    const clickEvent = () => {
      if (ignore) {
        return
      }
      const info = generateUserBehaviorLogInfo(
        'click',
        pathname,
        userBehaviorLogInfoPayload
      )
      sendLog(info)
    }
    window.addEventListener('click', clickEvent)
    return () => {
      ignore = true
      window.removeEventListener('click', clickEvent)
    }
  }, [isLogInProcessFinished, pathname, userBehaviorLogInfoPayload])

  return null
}
