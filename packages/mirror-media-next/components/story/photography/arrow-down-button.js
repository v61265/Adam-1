import styled from 'styled-components'
import { ArrowDown } from './icons'

const Button = styled.button`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  outline: none;
  cursor: pointer;
  width: 24px;
  height: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in;

  &:focus {
    outline: 0;
  }

  svg {
    line {
      stroke: rgba(255, 255, 255, 0.8);
    }
  }

  &:hover {
    transform: translateX(-50%) translateY(6px);
    svg {
      line {
        stroke: white;
      }
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    bottom: 24px;
    width: 52px;
    height: 26px;
  }
`

/**
 * ArrowButton component.
 *
 * @component
 * @param {Object} props
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} props.onClick - The click event handler.
 * @param {React.Ref<HTMLButtonElement>} [props.ref] - The optional ref for the button element.
 * @returns {JSX.Element}
 */

const ArrowButton = ({ onClick }, ref) => {
  return (
    <Button onClick={onClick} ref={ref}>
      <ArrowDown />
    </Button>
  )
}

export default ArrowButton
