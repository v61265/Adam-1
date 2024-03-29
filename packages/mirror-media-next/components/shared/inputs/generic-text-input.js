import styled, { css } from 'styled-components'
import { InputState } from '../../../constants/component'
import Hint from '../hint'
import IconCheckPass from '../../../public/images-next/check-pass.svg'

// following comments is required since these variables are used by comments but not codes.
/* eslint-disable-next-line no-unused-vars */
const { Start, Invalid, Valid } = InputState

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
`
/**
 * @typedef {Object} InputProps
 * @property {boolean} $isInvalid
 */

/** @type {import('styled-components').StyledComponent<"input", any, InputProps, never>} */
const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px;
  overflow-x: scroll;
  background: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.87);
  outline: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:active,
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.87);
  }

  ${
    /** @param {InputProps} props */
    ({ $isInvalid }) =>
      $isInvalid &&
      css`
        border: 1px solid #e51731;
      `
  }
`

/**
 * @param {Object} props
 * @param {string} [props.value] - 顯示數值
 * @param {string} props.placeholder - placeholder 數值
 * @param {Start | Invalid | Valid} props.isValid - 數值是否正確
 * @param {boolean} [props.isDisabled] - 是否禁止修改
 * @param {string} [props.errorMessage] - 錯誤訊息
 * @param {string} [props.validMessage] - 正確訊息
 * @param {import("react").ChangeEventHandler<HTMLInputElement>} props.onChange - 數值變動處理
 */
export default function GenericTextInput({
  value,
  placeholder,
  isValid,
  isDisabled,
  errorMessage,
  validMessage,
  onChange,
}) {
  const shouldShowErrorMessage = isValid === InputState.Invalid && errorMessage
  const shouldShowValidMessage = isValid === InputState.Valid && validMessage

  return (
    <Wrapper>
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        $isInvalid={isValid === InputState.Invalid}
      />
      {shouldShowValidMessage && (
        <Hint $state={InputState.Valid}>
          <IconCheckPass />
          <span>{validMessage}</span>
        </Hint>
      )}
      {shouldShowErrorMessage && (
        <Hint $state={InputState.Invalid}>{errorMessage}</Hint>
      )}
    </Wrapper>
  )
}
