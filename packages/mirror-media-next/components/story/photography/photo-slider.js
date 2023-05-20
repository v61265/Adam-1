import styled from 'styled-components'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination, Mousewheel } from 'swiper'

const SwiperWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  overscroll-behavior: auto; /* Enable touchpad scrolling on Mac */

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    color: #000;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default function PhotoSlider(
  {
    // heroImage = null,
    // heroCaption = '',
    // title = '',
  }
) {
  return (
    <SwiperWrapper>
      <Swiper
        modules={[Pagination, Mousewheel]}
        direction={'vertical'}
        mousewheel={{ releaseOnEdges: true }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </SwiperWrapper>
  )
}
