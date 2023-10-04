import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

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

  return (
    <Container>
      <Slot className="slots">
        {reels.map((reel, index) => (
          <Reel key={index} className="reel"></Reel>
        ))}
        <SlotImage />
      </Slot>
    </Container>
  )
}
