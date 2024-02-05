/** @typedef {'Google' | 'Facebook' | 'Apple'} ThirdPartyName */

/**
 *
 * @param {React.ComponentProps<'button'> & {thirdPartyName: ThirdPartyName}} props
 * @returns
 */
export default function ContainerMembershipLoginWithThirdParty({
  thirdPartyName,
}) {
  return <button>第三方{thirdPartyName}登入</button>
}
