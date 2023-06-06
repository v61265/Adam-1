import { useEffect, useState } from 'react'

import { getAdSlotParam, getAdWidth } from '../../../utils/gpt-ad.js'
import styled from 'styled-components'

// use global object store cross component div id name and prevent re-render when update
const GPTAdSlotsDefined = {}

const Wrapper = styled.div`
  /**
 * 廣告有時會替換掉原本 <Ad> 元件裡頭的根元素 <div>
 * 因此不限定所指定的元素類型（*）
 * 以確保能選擇到 Wrapper 的直接子元素
 */
  & > * {
    display: block;
    margin-left: auto;
    margin-right: auto;
    iframe {
      display: block;
    }
  }
`

const Ad = styled.div`
  max-width: 100%;
  text-align: center;

  /* don't use 'align-items: center;' to prevent gpt layout issue */
  iframe {
    margin-left: auto;
    margin-right: auto;
  }

  width: ${
    /**
     * @param {Object} props
     * @param {string} props.width
     * @returns
     */
    ({ width }) => width || 'unset'
  };
`

/**
 * @param {Object} props
 * @param {string} props.pageKey - key to access GPT_UNITS first layer
 * @param {string} props.adKey - key to access GPT_UNITS second layer, might need to complete with device
 * @param {function} [props.onSlotRequested] - callback when slotRequested event occurs
 * @param {function} [props.onSlotRenderEnded] - callback when slotRenderEnded event occurs
 * @param {string} [props.className] - for styled-component method to add styles
 * @returns
 */
export default function GPTAd({
  pageKey,
  adKey,
  onSlotRequested,
  onSlotRenderEnded,
  className,
}) {
  const [adWidth, setAdWidth] = useState('')
  const [adDivId, setAdDivId] = useState('')

  useEffect(() => {
    const width = window.innerWidth
    const adSlotParam = getAdSlotParam(pageKey, adKey, width)
    if (!adSlotParam) {
      return
    }
    const { adUnitPath, adSize } = adSlotParam
    const adDivId = adUnitPath
    const adWidth = getAdWidth(adSize)
    setAdWidth(adWidth)
    setAdDivId(adDivId)

    /**
     * Check https://developers.google.com/publisher-tag/guides/get-started?hl=en for the tutorial of the flow.
     */
    let adSlot = GPTAdSlotsDefined[adDivId]
    if (!adSlot) {
      window.googletag.cmd.push(() => {
        adSlot = window.googletag
          .defineSlot(adUnitPath, adSize, adDivId)
          .addService(window.googletag.pubads())

        GPTAdSlotsDefined[adDivId] = adSlot
      })

      window.googletag.cmd.push(() => {
        window.googletag.display(adDivId)
      })
    } else {
      window.googletag.cmd.push(() => {
        window.googletag.pubads().refresh([adSlot])
      })
    }

    // see: https://developers.google.com/doubleclick-gpt/reference#googletag.service-addeventlistenereventtype,-listener
    window.googletag.cmd.push(() => {
      const pubads = window.googletag.pubads()
      const events = [
        'slotRequested',
        'slotRenderEnded',
        'impressionViewable',
        'slotOnload',
        'slotVisibilityChanged',
      ]
      events.forEach((event) =>
        // @ts-ignore
        pubads.addEventListener(event, (e) => {
          if (e.slot === adSlot) {
            switch (event) {
              case 'slotRequested':
                onSlotRequested && onSlotRequested(e)
                break
              case 'slotRenderEnded':
                onSlotRenderEnded && onSlotRenderEnded(e)
                break

              default:
                break
            }
          }
        })
      )
    })

    return () => {
      window.googletag.cmd.push(() => {
        window.googletag.destroySlots([adSlot])
      })
    }
  }, [adKey, pageKey, onSlotRequested, onSlotRenderEnded])

  return (
    <Wrapper className={`${className} gpt-ad`}>
      <Ad width={adWidth} id={adDivId} />
    </Wrapper>
  )
}
