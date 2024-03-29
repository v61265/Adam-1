import styled, { css } from 'styled-components'
import { useState } from 'react'
import { InputState } from '../../../constants/component'
import IconCheckPass from '../../../public/images-next/check-pass.svg'
import IconConceal from '../../../public/images-next/login/conceal.svg'
import IconReveal from '../../../public/images-next/login/reveal.svg'

/** @typedef {import('../../../constants/component').InputStateEnum} PasswordInputState */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
  background: #fff;
`

/**
 * @typedef {Object} GroupProps
 * @property {boolean} $isInvalid
 * @property {boolean} $isFocus
 */

/** @type {import('styled-components').StyledComponent<"div", any, GroupProps, never>} */
const Group = styled.div`
  display: flex;
  height: 48px;
  padding: 12px;
  align-items: center;
  column-gap: 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);

  ${
    /** @param {GroupProps} props */
    ({ $isInvalid }) =>
      $isInvalid &&
      css`
        border: 1px solid #e51731;
      `
  }

  ${
    /** @param {GroupProps} props */
    ({ $isFocus }) =>
      $isFocus &&
      css`
        border: 1px solid rgba(0, 0, 0, 0.87);
      `
  }
`

const Input = styled.input`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.87);
  outline: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`

const Toggle = styled.button`
  outline: none;
  &:focus {
    outline: none;
  }
`

/**
 * @typedef {Object} MessageProps
 * @property {} $state
 */

/** @param {PasswordInputState} state */
const getTextColorByState = (state) => {
  switch (state) {
    case InputState.Start:
    case InputState.Incomplete:
      return css`
        color: rgba(0, 0, 0, 0.5);
      `
    case InputState.Invalid:
      return css`
        color: #e51731;
      `
    case InputState.Valid:
      return css`
        color: #009045;
      `
  }
}

/** @type {import('styled-components').StyledComponent<"p", any, MessageProps, never>} */
const Message = styled.p`
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;

  ${
    /** @param {MessageProps} props */
    ({ $state }) => getTextColorByState($state)
  }
`

/**
 * @param {Object} props
 * @param {string} props.value - input 數值
 * @param {PasswordInputState} props.state - input 狀態
 * @param {string} props.placeholder - input placeholder
 * @param {string} [props.incompleteMessage] - 輸入未完成的提示
 * @param {string} [props.invalidMessage] - 輸入錯誤的提示
 * @param {string} [props.validMessage] - 輸入正確的提示
 * @param {import('react').ChangeEventHandler<HTMLInputElement>} props.onChange - input 數值變動處理
 */
export default function GenericPasswordInput({
  value,
  state,
  placeholder,
  incompleteMessage,
  invalidMessage,
  validMessage,
  onChange,
}) {
  const [isConcealed, setIsConealed] = useState(true)
  const [isFocus, setIsFocus] = useState(false)

  const getHint = () => {
    switch (state) {
      case InputState.Invalid:
        return <Message $state={InputState.Invalid}>{invalidMessage}</Message>
      case InputState.Valid:
        if (incompleteMessage || validMessage) {
          const message = validMessage ?? incompleteMessage
          return (
            <Message $state={InputState.Valid}>
              <IconCheckPass />
              <span>{message}</span>
            </Message>
          )
        } else {
          return
        }
      case InputState.Incomplete:
        if (incompleteMessage || validMessage) {
          const message = incompleteMessage ?? validMessage
          return <Message $state={InputState.Incomplete}>{message}</Message>
        } else {
          return
        }
      case InputState.Start:
        return
    }
  }

  return (
    <Wrapper>
      <Group $isInvalid={state === InputState.Invalid} $isFocus={isFocus}>
        <Input
          type={isConcealed ? 'password' : 'text'}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <Toggle type="button" onClick={() => setIsConealed(!isConcealed)}>
          {isConcealed ? <IconReveal /> : <IconConceal />}
        </Toggle>
      </Group>
      {getHint()}
    </Wrapper>
  )
}
