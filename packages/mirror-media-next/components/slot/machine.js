import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div``

const Slot = styled.div`
  height: 235px;
  width: 422px;
  padding: 50px 50px;
  z-index: 2;
  position: relative;
  display: flex;
  &:before {
    content: ''
    width: 90%
    height: 10px;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Reel = styled.div`
  width: 70px;
  height: 190px;
  margin-top: -40px;
  background-image: url('https://storage.googleapis.com/statics.mirrormedia.mg/campaigns/slot2023/reel.jpg');
  background-size: cover;
  position: relative;
  margin-right: 20px;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      rgba(black, 0.4) 0%,
      transparent 30%,
      transparent 70%,
      rgba(black, 0.4) 100%
    );
    box-shadow: inset 0 0 6px 2px rgba(black, 0.3);
  }
`

const SlotImage = styled.div`
  height: 235px;
  width: 422px;
  background: url('https://storage.googleapis.com/statics.mirrormedia.mg/campaigns/slot2023/machine.gif');
  position: absolute;
  top: 0;
  left: 0;
`

/**
 * @returns {React.ReactElement}
 */
export default function Mechine() {
  const reels = [0, 1, 2]

  const num_icons = 12
  const icon_height = (70 / 171) * 178
  const time_per_icon = 200
  const [result, setResult] = useState([0, 0, 0])

  const roll = (reel, offset = 0) => {
    // Minimum of 2 + the reel offset rounds
    const delta =
      (offset + 2) * num_icons + Math.round(Math.random() * num_icons)
    console.log(123)

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

  return (
    <Container onClick={rollAll}>
      <Slot className="slots">
        {reels.map((reel, index) => (
          <Reel key={index} className="reel"></Reel>
        ))}
        <SlotImage />
      </Slot>
    </Container>
  )
}
