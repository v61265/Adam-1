import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { applyActionCode } from 'firebase/auth'
import { useMembership } from '../../context/membership'
import { generateErrorReportInfo } from '../../utils/log/error-log'
import { sendErrorLog } from '../../utils/log/send-log'
import FormWrapper from './form-wrapper'
import PrimaryButton from '../shared/buttons/primary-button'

const DEFAULT = 'default'
const SUCCESS = 'success'
const FAILED = 'failed'
const VERIFICATION_STATE = /** @type {const} */ ({
  DEFAULT,
  SUCCESS,
  FAILED,
})

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentBlock = styled.div`
  margin-bottom: 24px;
`

const PrimaryText = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 150%;
`

const SecondaryText = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  margin-top: 12px;
`

/** @typedef {DEFAULT | SUCCESS | FAILED} VerficationState */

export default function BodyEmailVerification() {
  const { isLoggedIn, userEmail, firebaseId, memberInfo } = useMembership()
  const [verificationState, setVerificationState] = useState(
    /** @type {VerficationState} */ (VERIFICATION_STATE.DEFAULT)
  )
  const router = useRouter()
  const actionCode = router.query.oobCode

  useEffect(() => {
    if (Array.isArray(actionCode)) {
      setVerificationState(VERIFICATION_STATE.FAILED)
      return
    }

    applyActionCode(auth, actionCode)
      .then(() => {
        setVerificationState(VERIFICATION_STATE.SUCCESS)
      })
      .catch((err) => {
        setVerificationState(VERIFICATION_STATE.FAILED)

        const errorReport = generateErrorReportInfo(err, {
          userEmail,
          firebaseId,
          memberType: memberInfo?.memberType,
        })

        sendErrorLog(errorReport)
      })
  }, [actionCode, userEmail, firebaseId, memberInfo])

  const primaryTextWording = isLoggedIn
    ? `${userEmail} 已驗證成功！`
    : `已驗證成功！`

  const primaryButtonWording = isLoggedIn ? '繼續前往付款' : '重新登入'

  const handleOnPrimaryButtonClicked = () => {
    const destination = '/subscribe'

    if (isLoggedIn) {
      router.push({
        pathname: destination,
      })
    } else {
      router.push({
        pathname: '/login',
        query: {
          destination,
        },
      })
    }
  }

  switch (verificationState) {
    case VERIFICATION_STATE.DEFAULT:
      return <></>
    case VERIFICATION_STATE.SUCCESS:
      return (
        <Main>
          <FormWrapper>
            <ContentBlock>
              <PrimaryText>{primaryTextWording}</PrimaryText>
              {!isLoggedIn && (
                <SecondaryText>請重新登入，繼續完成訂購流程</SecondaryText>
              )}
            </ContentBlock>
            <PrimaryButton onClick={handleOnPrimaryButtonClicked}>
              {primaryButtonWording}
            </PrimaryButton>
          </FormWrapper>
        </Main>
      )
    case VERIFICATION_STATE.FAILED:
      // TODO: add design
      return <></>
  }
}
