import { useState, useRef } from 'react'
import styled from 'styled-components'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { MEDIA_SIZE } from '../../constants'
import { minWidth } from '../../styles/breakpoint'
import searchButtonWeb from '../../public/images/search-button-web.png'
import SearchButtonMobileSVG from '../../public/images/search-button-mobile.svg'
import SearchBarInput from './search-bar-input'
import { SearchIconWidth } from '../../styles/header-style-const'
import useClickOutside from '../../hooks/useClickOutside'

const SearchBarWrapper = styled.section`
  @media ${minWidth.xl} {
    display: flex;
  }
`

const SearchButton = styled.button`
  display: block;
  width: ${SearchIconWidth};
  height: 18px;
  cursor: pointer;
  user-select: none;

  path {
    fill: white;
  }

  @media ${minWidth.xl} {
    width: 40px;
    height: 34px;
    background-size: 15px;
    cursor: pointer;
    user-select: none;
    background-image: url(${searchButtonWeb.src});
    background-color: #888;
    background-position: center;
    background-repeat: no-repeat;
    margin-left: 4px;
    transition: background-color 0.15s ease-out;
    &:hover {
      background-color: #074f77;
    }
  }
`

const SearchFieldWrapper = styled.div`
  background-color: #d8d8d8;
  top: 76px;
  padding: 16px 24px;
  width: 100%;
  position: absolute;
  left: 0;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 16px 8px;
    border-color: transparent transparent #d8d8d8 transparent;
    position: absolute;
    top: -16px;
    right: calc(5vw);
    @media ${minWidth.md} {
      right: calc(5vw + 20px);
    }
  }
`

export default function SearchBar() {
  const [showSearchField, setShowSearchField] = useState(false)
  const mobileSearchWrapperRef = useRef(null)
  useClickOutside(mobileSearchWrapperRef, () => {
    setShowSearchField(false)
  })
  const { width } = useWindowDimensions()

  if (width < MEDIA_SIZE.xl) {
    return (
      <SearchBarWrapper ref={mobileSearchWrapperRef}>
        <SearchButton
          onClick={() => {
            setShowSearchField((val) => !val)
          }}
        >
          <SearchButtonMobileSVG />
        </SearchButton>
        {showSearchField && (
          <SearchFieldWrapper>
            <SearchBarInput />
          </SearchFieldWrapper>
        )}
      </SearchBarWrapper>
    )
  } else {
    return (
      <SearchBarWrapper>
        <SearchBarInput />
        <SearchButton />
      </SearchBarWrapper>
    )
  }
}
