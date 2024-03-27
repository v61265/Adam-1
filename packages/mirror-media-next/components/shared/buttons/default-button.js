import styled from 'styled-components'
import DefaultButtonLoadingEffect from './default-button-loading-effect'

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  &:active,
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.87);
  }
`

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.isLoading]
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} props.onClick
 */
export default function DefaultButton({
  children,
  isLoading = false,
  onClick,
}) {
  return (
    <Button type="button" onClick={onClick}>
      {isLoading ? <DefaultButtonLoadingEffect /> : children}
    </Button>
  )
}
