import Link from 'next/link'
import Image from 'next/image'

/**
 *
 * @param {Object} props
 * @param {'facebook' | 'line'} props.type - What kind of social network platform
 * @param {number} [props.width] - width of image. optional, default is 35
 * @param {number} [props.height] - height of image. optional, default is 35
 * @returns {JSX.Element}
 */
export default function ButtonSocialNetworkShare({
  type,
  width = 35,
  height = 35,
}) {
  const getSocialNetWorkInfo = (type) => {
    type
    switch (type) {
      case 'facebook':
        return {
          imageSrc: '/images/fb-logo.svg',
          imageAlt: 'facebook-share',
          link: '/',
        }
      case 'line':
        return {
          imageSrc: '/images/line-logo.svg',
          imageAlt: 'line-share',
          link: '/',
        }

      default:
        return {
          imageSrc: '/images/line-logo.svg',
          imageAlt: 'line-share',
          link: '/',
        }
    }
  }
  const imageInfo = getSocialNetWorkInfo(type)
  return (
    <Link href={imageInfo.link} target="_blank">
      <Image
        src={imageInfo.imageSrc}
        width={width}
        height={height}
        alt={imageInfo.imageAlt}
      ></Image>
    </Link>
  )
}
