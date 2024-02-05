/**
 * @typedef {'primary' | 'secondary'} ButtonType
 */

/**
 * @param {React.PropsWithChildren<{buttonType: ButtonType}>} props
 */
export default function UiMembershipButton({ buttonType, children }) {
  return (
    <button>
      {buttonType}
      {children}
    </button>
  )
}
