import Image from 'next/image'

import styled from 'styled-components'
import { Z_INDEX } from '../../constants'
import { getCategoryOfWineSlug } from '../../utils/index'

const Wrapper = styled.div`
  width: 100%;
  height: 10vh;
  background: #000000;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: ${Z_INDEX.coverContent};
  display: flex;
  align-items: center;
  justify-content: center;

  .wine-warning-image {
    width: auto;
    height: auto;
    object-fit: contain;
    &--desktop {
      display: none;
      ${({ theme }) => theme.breakpoint.sm} {
        display: block;
      }
    }
    &--mobile {
      display: block;
      ${({ theme }) => theme.breakpoint.sm} {
        display: none;
      }
    }
  }
`
/**
 * @typedef {import('../../apollo/fragments/category').Category} Category - category information
 */

/**
 *
 * @param {Object} props
 * @param {Pick<Category, 'id' | 'name'  | 'slug'>[]} props.categories - certain category information
 * @returns {JSX.Element}
 */

export default function WineWarning({ categories = [] }) {
  const categoryOfWineSlug = getCategoryOfWineSlug(categories)

  const wineWarningJsx =
    categoryOfWineSlug.length > 0 ? (
      <Wrapper>
        <Image
          className="wine-warning-image wine-warning-image--desktop"
          src={'/images/wine-warning.jpg'}
          fill={true}
          alt="wine-warning"
        />
        <Image
          className="wine-warning-image wine-warning-image--mobile"
          src={'/images/wine-warning-mobile.png'}
          fill={true}
          alt="wine-warning"
        />
      </Wrapper>
    ) : null

  return <>{wineWarningJsx}</>
}
