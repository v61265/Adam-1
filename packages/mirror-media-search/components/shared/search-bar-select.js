import { useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from '../../hooks/useClickOutside'
import { minWidth } from '../../styles/breakpoint'

const SearchSelectWrapper = styled.div`
  font-size: 16px;
  position: relative;
  height: 34px;

  @media ${minWidth.xl} {
    font-size: 14px;
    width: 100px;
    margin-left: 4px;
  }
`
const SearchSelectButton = styled.button`
  padding-left: 12px;
  padding-right: 12px;
  line-height: 34px;
  height: 100%;
  cursor: pointer;
  user-select: none;
  display: block;
  width: 100%;
  text-align: left;
  position: relative;
  background-color: #fff;
  color: #888;
  &::after {
    content: '';
    display: block;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    border-color: #888 transparent transparent;
    border-style: solid;
    border-width: 6px 5px 0 5px;
  }
`
const SearchSelectOptionWrapper = styled.ul`
  color: #1b1b1b;
  position: absolute;
  top: 34px;
  left: 0;
  width: 100%;
  height: 308px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.1);
  padding-left: unset;
`
const SearchSelectOption = styled.li`
  padding-left: 12px;
  padding-right: 12px;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: #f5f5f5;
  }
  ${({ selected }) =>
    selected &&
    ` 
    background-color: #074f77 !important; 
    color: #fff;
    `}
`

export default function SearchBarSelect({
  options = [
    { title: '全部' },
    { title: '假資料一' },
    { title: '假資料二' },
    { title: '假資料三' },
    { title: '假資料四' },
  ],
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showSelectOptions, setShowSelectOptions] = useState(false)
  const selectWrapperRef = useRef(null)
  console.log('rerender')
  useClickOutside(selectWrapperRef, () => {
    setShowSelectOptions(false)
  })
  const selectedOption = options[selectedIndex]

  return (
    <SearchSelectWrapper ref={selectWrapperRef}>
      <SearchSelectButton
        onClick={() => {
          setShowSelectOptions((val) => !val)
        }}
      >
        {selectedOption?.title ?? ''}
      </SearchSelectButton>
      {showSelectOptions && (
        <SearchSelectOptionWrapper>
          {options.map(({ title }, index) => (
            <SearchSelectOption
              key={title}
              onClick={() => {
                setSelectedIndex(index)
                setShowSelectOptions(false)
              }}
              selected={selectedIndex === index}
            >
              {title}
            </SearchSelectOption>
          ))}
        </SearchSelectOptionWrapper>
      )}
    </SearchSelectWrapper>
  )
}
