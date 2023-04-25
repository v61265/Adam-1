import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper'
import TopicListArticles from './topic-list-articles'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import css from 'styled-jsx/css'
import { useCallback, useState } from 'react'

const Container = styled.main`
  margin: 0 auto;
  background: #eee;

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0;
  }

  // custom css from cms, mainly used class name .topic, .topic-title, .leading
  ${({ customCss }) =>
    customCss &&
    css`
      ${customCss}
    `}
`

const Topic = styled.div`
  background-repeat: no-repeat;
  height: auto;
  padding-top: 66.66%;
  background-position: 50%;
  background-size: cover;

  ${({ theme }) => theme.breakpoint.md} {
  }
  ${({ theme }) => theme.breakpoint.xl} {
    height: 600px;
    padding-top 0;
  }
`
const TopicTitle = styled.div`
  background-repeat: no-repeat;
`
const TopicLeading = styled.div`
  width: 87.5%;
  max-width: 450px;
  margin: 0 auto;
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
  .swiper-slide {
    img {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
  ${({ theme }) => theme.breakpoint.md} {
    width: 50%;
    max-width: 830px;
  }
`
const CustomSwiperPrev = styled.div`
  position: absolute;
  top: 50%;
  width: 12px;
  height: 28px;
  margin-top: calc(0px - (28px / 2));
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #204f74;
  left: 8px;
  ${({ theme }) => theme.breakpoint.md} {
    left: -24px;
  }

  &:after {
    content: 'prev';
    font-family: swiper-icons;
    font-size: 28px;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
  }
`

const CustomSwiperNext = styled.div`
  position: absolute;
  top: 50%;
  width: 12px;
  height: 28px;
  margin-top: calc(0px - (28px / 2));
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #204f74;
  right: 8px;
  ${({ theme }) => theme.breakpoint.md} {
    right: -24px;
  }

  &:after {
    content: 'next';
    font-family: swiper-icons;
    font-size: 28px;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
  }
`

/**
 * @typedef {import('../../../apollo/fragments/photo').Photo & {
 *  id: string;
 *  name: string;
 *  imageFile: {
 *    width: number;
 *    height: number;
 *  }
 *  resized: {
 *    original: string;
 *    w480: string;
 *    w800: string;
 *    w1200: string;
 *    w1600: string;
 *    w2400: string;
 *  }
 * }} Photo
 * @typedef {import('./topic-list-articles').Article} Article
 * @typedef {import('../../../apollo/fragments/topic').Topic & {
 *  id: string;
 *  name: string;
 *  brief: import('../../../type/draft-js').Draft;
 *  heroImage: Photo;
 *  leading: string;
 *  type: string;
 *  style: string;
 *  posts: Article[];
 * }} Topic
 * an mm 2.0 data from example http://104.199.190.189:8080/images?where=%7B%22topics%22%3A%7B%22%24in%22%3A%5B%225a30e6ae4be59110005c5e6b%22%5D%7D%7D&max_results=25
 * @typedef {{
 *  _id: string,
 *  description: string
 *  createTime: string
 *  image: {
 *    filename: string
 *    resizedTargets: {
 *      tiny: {
 *        height: number
 *        width: number
 *        url: string
 *      }
 *      mobile: {
 *        height: number
 *        width: number
 *        url: string
 *      }
 *      tablet: {
 *        height: number
 *        width: number
 *        url: string
 *      }
 *      desktop: {
 *        height: number
 *        width: number
 *        url: string
 *      }
 *    }
 *    keywords: string
 *  }
 * }} SlideshowItem
 */

/**
 * @param {Object} props
 * @param {Topic} props.topic
 * @param {number} props.renderPageSize
 * @param {SlideshowItem[]} props.slideshowData
 * @returns {React.ReactElement}
 */
export default function TopicList({ topic, renderPageSize, slideshowData }) {
  const [swiperRef, setSwiperRef] = useState(null)
  const { postsCount, posts, id, style } = topic

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev()
  }, [swiperRef])

  const handleNext = useCallback(() => {
    swiperRef?.slideNext()
  }, [swiperRef])

  return (
    <>
      <Container customCss={style}>
        <Topic className="topic">
          <TopicTitle className="topic-title" />
          <TopicLeading className="leading">
            {!!slideshowData.length && (
              <>
                <CustomSwiperPrev onClick={handlePrevious} />
                <CustomSwiperNext onClick={handleNext} />
                <Swiper
                  onSwiper={setSwiperRef}
                  spaceBetween={100}
                  centeredSlides={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  speed={750}
                  navigation={true}
                  modules={[Autoplay, Navigation]}
                >
                  {slideshowData.map((item) => (
                    <SwiperSlide key={item._id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image?.resizedTargets?.tablet?.url}
                        alt={item.description}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </TopicLeading>
        </Topic>
        <TopicListArticles
          topicId={id}
          posts={posts}
          postsCount={postsCount}
          renderPageSize={renderPageSize}
        />
      </Container>
    </>
  )
}
