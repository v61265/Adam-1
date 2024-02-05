import ContainerMembershipLoginWithThirdParty from './container-membership-login-with-third-party'
import UiMembershipInputEmailInvalidation from './ui-membership-input-email-invalidation'
import UiMembershipButton from './ui/button/ui-membership-button'
/**
 * @typedef {import('./container-membership-login-with-third-party').ThirdPartyName} ThirdPartyName
 */

/**
 * @type { {name: ThirdPartyName}[]}
 */
const THIRD_PARTY_LIST = [
  { name: 'Google' },
  { name: 'Facebook' },
  { name: 'Apple' },
]
export default function ContainerLoginFormInitial() {
  return (
    <div>
      ContainerLoginFormInitial
      <p>第三方登入</p>
      {THIRD_PARTY_LIST.map((item) => (
        <ContainerMembershipLoginWithThirdParty
          key={item.name}
          thirdPartyName={item.name}
        />
      ))}
      <p>或</p>
      <UiMembershipInputEmailInvalidation></UiMembershipInputEmailInvalidation>
      <UiMembershipButton buttonType={'primary'}>下一步</UiMembershipButton>
    </div>
  )
}
