import Image from 'next/image'

import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 5vh;
  background: #000000;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.breakpoint.sm} {
    height: 10vh;
  }

  .wine-warning-image {
    width: auto;
    height: auto;
    object-fit: contain;
  }
`
/**
 * @typedef {import('../../../apollo/fragments/category').Category} Category - category information
 */

/**
 *
 * @param {Object} props
 * @param {Pick<Category, 'id' | 'name'  | 'slug'>[]} props.categories - certain category information
 * @returns {JSX.Element}
 */

export default function WineWarning({ categories }) {
  const categoryOfWineSlug = categories.filter(
    (category) => category.slug === 'wine' || category.slug === 'wine1'
  )

  return (
    <>
      {categoryOfWineSlug.length > 0 && (
        <Wrapper>
          <Image
            className="wine-warning-image"
            src={'/images/wine-warning.jpg'}
            fill={true}
            alt="wine-warning"
          />
        </Wrapper>
      )}
    </>
  )
}
