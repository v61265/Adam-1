import { useEffect, useMemo } from 'react'
import { useMembership } from '../context/membership'
import { useRouter } from 'next/router'

/**
 * @callback MembershipValidator
 * @param {import('../context/membership').MemberInfo | undefined} memberInfo
 * @returns {boolean}
 */

/**
 * Client-side authenication handle.
 * It is useful when membership state changed but page didn't reloaded.
 *
 * @param {MembershipValidator} [validator]
 */
export default function useMembershipRequired(validator) {
  const router = useRouter()
  const { isLoggedIn, memberInfo, isLogInProcessFinished } = useMembership()

  const isValidMember = useMemo(
    () => (typeof validator === 'function' ? validator(memberInfo) : true),
    [memberInfo, validator]
  )

  useEffect(() => {
    if (isLogInProcessFinished && (!isLoggedIn || !isValidMember)) {
      router.push({
        pathname: '/login',
        query: {
          destination: '/magazine',
        },
      })
    }
  }, [router, isLogInProcessFinished, isLoggedIn, isValidMember])
}
