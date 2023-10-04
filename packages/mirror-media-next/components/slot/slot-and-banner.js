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
  transform: translate(calc(-50% + 15px), -50%);
`

/**
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function Slot() {
  const { isLoggedIn, userEmail, firebaseId } = useMembership()
  const router = useRouter()
  const { width } = useWindowDimensions()
  const isMobile = useMemo(() => width < 1200, [width])
  const [isHover, setIsHover] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

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

  const handleClickSlot = (e) => {
    e.preventDefault()
    const randomValue = Math.random()
    if (randomValue < probabilities.prize100) {
      setWinPrize(100)
    } else if (randomValue < probabilities.prize50) {
      setWinPrize(50)
    } else {
      setWinPrize('0')
    }
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
          {SlotMachine()}
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
            {SlotMachine()}
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
            {SlotMachine()}
          </BannerLink>
        )
      }
    }
  }, [status, winPrize, isLoggedIn, router, width, SlotMachine])

  if (ENV === 'prod' || ENV === 'staging') return null

  return <SlotContainer>{slotComponent()}</SlotContainer>
}
