import Link from 'next/link'
import Image from 'next/image'
import useSharedUrl from '../../../hooks/use-shared-url'
const FACEBOOK_SHARED_URL = 'https://www.facebook.com/share.php?u='
const LINE_SHARED_URL = 'https://social-plugins.line.me/lineit/share?url='
/**
 *
 * @param {Object} props
 * @param {'facebook' | 'line'} props.type - What kind of social network platform
 * @param {number} [props.width] - width of image. optional, default is 35
 * @param {number} [props.height] - height of image. optional, default is 35
 * @param {string} [props.url] - path need to be shared. Optional, value will be current page url if not assigned.
 * @returns {JSX.Element}
 */
export default function ButtonSocialNetworkShare({
  type,
  width = 35,
  height = 35,
  url = '',
}) {
  const sharedUrl = useSharedUrl(url)

  const getSocialNetWorkInfo = (type) => {
    switch (type) {
      case 'facebook':
        return {
          imageSrc: '/images/fb-logo.svg',
          imageAlt: 'facebook-share',
          link: `${FACEBOOK_SHARED_URL}${sharedUrl}`,
        }
      case 'line':
        return {
          imageSrc: '/images/line-logo.svg',
          imageAlt: 'line-share',
          link: `${LINE_SHARED_URL}${sharedUrl}`,
        }

      default:
        return {
          imageSrc: '/images/line-logo.svg',
          imageAlt: 'line-share',
          link: `${FACEBOOK_SHARED_URL}${sharedUrl}`,
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
