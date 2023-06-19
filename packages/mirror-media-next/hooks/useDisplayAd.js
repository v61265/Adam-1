import { useMembership } from '../context/membership'

/**
 *
 * @return {boolean} - indicating whether or not to display advertisement.
 */
export const useDisplayAd = () => {
  const { memberInfo, isLogInProcessFinished } = useMembership()
  const { memberType } = memberInfo

  //When the user's member type is 'not-member', 'one-time-member', or 'basic-member', the AD should be displayed.
  const invalidMemberType = ['not-member', 'one-time-member', 'basic-member']

  const shouldShowAd = Boolean(
    isLogInProcessFinished && invalidMemberType.includes(memberType)
  )

  return shouldShowAd
}
