import styled from 'styled-components'
import { useState } from 'react'

const DropdownMenuWrapper = styled.div`
  position: relative;
`

/**
 * @typedef {Object} SelectBoxProps
 * @property {boolean} isOpen
 * @property {boolean} isSelected
 * @property {boolean} disabled
 */

/**
 * @type {import('styled-components').StyledComponent<"div", any, SelectBoxProps, never>}
 */
const SelectBox = styled.div`
  position: relative;
  border: 1px solid ${(props) => (props.isOpen ? '#000000de' : '#0000004d')};
  border-bottom: ${(props) => (props.isOpen ? 'none' : '1px solid #0000004d')};
  border-radius: ${(props) => (props.isOpen ? '8px 8px 0 0' : '8px')};
  color: ${(props) => (props.isSelected ? '#000000DE' : '#0000004d')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px;

  ::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 14px;
    border: solid #054f77;
    border-width: 0 0 2px 2px;
    padding: 4px;
    transform-origin: 25% 75%;
    transform: translateY(-50%)
      ${(props) => (props.isOpen ? 'rotate(135deg);' : 'rotate(-45deg)')};
  }

  ::before {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 12px;
    right: 12px;
    height: 1px;
    background-color: ${(props) =>
      props.isOpen ? '#0000004d' : 'transparent'};
  }
`

/**
 * @typedef {Object} UlProps
 * @property {boolean} isOpen
 */

/**
 * @type {import('styled-components').StyledComponent<"ul", any, UlProps, never>}
 */
const Ul = styled.ul`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #fff;
  width: 100%;
  z-index: 100;
  border: 1px solid #000000de;
  border-top: none;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
  max-height: 160px; // limit the visible items
  overflow-y: auto;
`
const Li = styled.li`
  padding: 8px 12px;
  :hover {
    cursor: pointer;
    color: #fff;
    background-color: #054f77;
  }
`
/**
 * @param {Object} props
 * @param {object} props.options
 * @param {string} props.keyField
 * @param {string} props.value
 * @param {function(string):void} props.onSelect
 * @param {string} props.selectedOption
 * @param {boolean} [props.disabled=false]
 * @returns {JSX.Element}
 */

export default function DropdownMenu({
  options,
  keyField,
  value,
  onSelect,
  selectedOption,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleClickOption = (option) => {
    if (!disabled) {
      onSelect(option[value])
      setIsOpen(!isOpen)
    }
  }

  return (
    <DropdownMenuWrapper>
      <SelectBox
        isOpen={isOpen}
        isSelected={!!selectedOption}
        disabled={disabled}
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption : '請選擇'}
      </SelectBox>

      <Ul isOpen={isOpen}>
        {options.map((option) => (
          <Li key={option[keyField]} onClick={() => handleClickOption(option)}>
            {option[value]}
          </Li>
        ))}
      </Ul>
    </DropdownMenuWrapper>
  )
}
