import React, { useState, useEffect, useCallback, useMemo } from 'react'
import errors from '@twreporter/errors'
import { ENV } from '../../config/index.mjs'
import { useMembership } from '../../context/membership'
import axios from 'axios'

import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useWindowDimensions from '../../hooks/use-window-dimensions'
import Machine from './machine'

const SlotContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`

const Banner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 970px;
  height: 0;
  padding-top: 25.77%;
  position: relative;
`

const BannerLink = styled(Banner)`
  width: 300px;
  height: 250px;
  padding-top: 0;
  ${({ theme }) => theme.breakpoint.xl} {
    width: 970px;
  }
  &:hover {
    cursor: pointer;
  }
`

const MachineContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + 10px), calc(-50% + 42px)) scale(0.6);
  ${({ theme }) => theme.breakpoint.xl} {
    transform: translate(calc(-50% + 15px), calc(-50% + 0px)) scale(1);
  }
`

/**
 *
 * @returns {JSX.Element}
 */
export default function Slot() {
  const num_icons = 12
  const icon_height = (70 / 171) * 178
  const time_per_icon = 200
  const { isLoggedIn, userEmail, firebaseId } = useMembership()
  const router = useRouter()
  const { width } = useWindowDimensions()
  const isMobile = useMemo(() => width < 1200, [width])
  const [isHover, setIsHover] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const [result, setResult] = useState([0, 0, 0])

  const [status, setStatus] = useState({
    loading: true,
    hasError: false,
    isLoggedIn,
    hasPlayed: false,
  })
  const [probabilities, setProbabilities] = useState({
    prize100: 0,
    prize50: 0,
  })
  const [winPrize, setWinPrize] = useState(null)

  const getSlotSheetDataByUserEmail = async (userFirebaseId) => {
    const { data: sheetData } = await axios.post(
      `${window.location.origin}/api/slot-sheet`,
      { dispatch: 'LOAD_SHEET', userFirebaseId }
    )
    console.log({ sheetData })
    if (sheetData.status !== 'success') {
      return setStatus({
        ...status,
        loading: false,
        hasError: true,
      })
    }
    const { hasPlayed, probabilities } = sheetData.data
    setStatus({
      ...status,
      loading: false,
      hasPlayed,
    })
    setProbabilities({ ...probabilities })
  }

  const handleClickSlot = async (e) => {
    e.preventDefault()
    await rollAll()
    const randomValue = Math.random()
    if (randomValue < probabilities.prize100) {
      setWinPrize(100)
    } else if (randomValue < probabilities.prize50) {
      setWinPrize(50)
    } else {
      setWinPrize('0')
    }
  }

  const roll = (reel, offset = 0) => {
    // Minimum of 2 + the reel offset rounds
    const delta =
      (offset + 2) * num_icons + Math.round(Math.random() * num_icons)

    // Return promise so we can wait for all reels to finish
    return new Promise((resolve, reject) => {
      const style = getComputedStyle(reel),
        // Current background position
        backgroundPositionY = parseFloat(style['background-position-y']),
        // Target background position
        targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
        // Normalized background position, for reset
        normTargetBackgroundPositionY =
          targetBackgroundPositionY % (num_icons * icon_height)

      // Delay animation with timeout, for some reason a delay in the animation property causes stutter
      setTimeout(() => {
        // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
        reel.style.transition = `background-position-y ${
          (8 + 1 * delta) * time_per_icon
        }ms cubic-bezier(.41,-0.01,.63,1.09)`
        // Set background position
        reel.style.backgroundPositionY = `${
          backgroundPositionY + delta * icon_height
        }px`
      }, offset * 150)

      // After animation
      setTimeout(() => {
        // Reset position, so that it doesn't get higher without limit
        reel.style.transition = `none`
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`
        // Resolve this promise
        resolve(delta % num_icons)
      }, (8 + 1 * delta) * time_per_icon + offset * 150)
    })
  }

  function rollAll() {
    const reelsList = document.querySelectorAll('.slots > .reel')

    Promise
      // Activate each reel, must convert NodeList to Array for this with spread operator
      .all([...reelsList].map((reel, i) => roll(reel, i)))
      // When all reels done animating (all promises solve)
      .then((deltas) => {
        // add up indexes
        setResult(deltas)
        console.log({ deltas })
      })
  }

  useEffect(() => {
    setHasMounted(true)
    if (!isLoggedIn) return setStatus({ ...status, loading: false })
    // fetch data
    getSlotSheetDataByUserEmail(firebaseId)
  }, [isLoggedIn])

  useEffect(() => {
    if (!winPrize) return
    axios.post(`${window.location.origin}/api/slot-sheet`, {
      dispatch: 'WRITE_NEW_LINE',
      userEmail,
      prize: winPrize,
      userFirebaseId: firebaseId,
    })
  }, [winPrize])

  const SlotMachine = useCallback(() => {
    return (
      <MachineContainer>
        <Machine />
      </MachineContainer>
    )
  }, [])

  const slotComponent = useCallback(() => {
    if (status.loading || !hasMounted) return null
    if (!firebaseId) {
      return (
        <BannerLink
          onClick={() =>
            router.push(`/login?destination=${router.asPath || '/'}`)
          }
        >
          <Image
            src={`https://storage.googleapis.com/statics.mirrormedia.mg/campaigns/slot2023/not-login-${
              isMobile ? 'mobile' : 'desktop'
            }.gif`}
            alt="請登入"
            fill={true}
          />
          {/* <SlotMachine /> */}
        </BannerLink>
      )
    } else if (status.hasPlayed) {
      return (
        <Banner>
          <Image
            src="https://storage.googleapis.com/statics.mirrormedia.mg/campaigns/slot2023/has-played.jpg"
            alt="明天再試"
            fill={true}
          />
        </Banner>
      )
    } else if (!winPrize) {
      return (
        <BannerLink onClick={handleClickSlot}>
          <Image
            src={`https://storage.googleapis.com/statics.mirrormedia.mg/campaigns/slot2023/default-${
              isMobile ? 'mobile' : 'desktop'
            }.gif`}
            alt="抽獎"
            fill={true}
          />
          <SlotMachine />
        </BannerLink>
      )
    }
    switch (winPrize) {
      case '0': {
        return (
          <Banner>
            <Image
              src="https://storage.googleapis.com/statics.mirrormedia.mg/campaigns/slot2023/has-played.jpg"
              alt="明天再試"
              fill={true}
            />
            <SlotMachine />
          </Banner>
        )
      }
      case '50':
      case '100': {
        return (
          <BannerLink
            onClick={handleClickSlot}
            onMouseEnter={() => {
              setIsHover(true)
            }}
            onMouseLeave={() => {
              setIsHover(false)
            }}
          >
            <Image
              src={`https://storage.googleapis.com/statics.mirrormedia.mg/campaigns/slot2023/win-${
                isHover ? 'hover-' : ''
              }${isMobile ? 'mobile' : 'desktop'}.gif`}
              alt="抽獎"
              fill={true}
            />
            <SlotMachine />
          </BannerLink>
        )
      }
    }
  }, [status, winPrize, isLoggedIn, router, width, SlotMachine])

  if (ENV === 'prod' || ENV === 'staging') return null

  return <SlotContainer>{slotComponent()}</SlotContainer>
}
