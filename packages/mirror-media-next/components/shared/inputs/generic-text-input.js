import styled, { css } from 'styled-components'
import IconCheckPass from '../../../public/images-next/check-pass.svg'

const Start = 'start'
const Invalid = 'invalid'
const Valid = 'valid'
export const InputState = /** @type {const} */ ({
  Start,
  Invalid,
  Valid,
})

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
 * @typedef {Object} MessageProps
 * @property {boolean} $isValid
 */

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
    ({ $isValid }) =>
      $isValid
        ? css`
            color: #009045;
          `
        : css`
            color: #e51731;
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
        <Message $isValid={true}>
          <IconCheckPass />
          <span>{validMessage}</span>
        </Message>
      )}
      {shouldShowErrorMessage && (
        <Message $isValid={false}>{errorMessage}</Message>
      )}
    </Wrapper>
  )
}
