import React, { useState, useEffect } from 'react'
import errors from '@twreporter/errors'
import { GCP_PROJECT_ID, ENV } from '../config/index.mjs'
import { useMembership } from '../context/membership'
import Layout from '../components/shared/layout'
import axios from 'axios'

import { setPageCache } from '../utils/cache-setting'
import { fetchHeaderDataInDefaultPageLayout } from '../utils/api'

/**
 *
 * @param {Object} props
 * @param {any} props.headerData
 * @returns {JSX.Element}
 */
export default function Slot({ headerData = {} }) {
  const { isLoggedIn, userEmail } = useMembership()
  const { sectionsData = [], topicsData = [] } = headerData

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

  const getSlotSheetDataByUserEmail = async (userEmail) => {
    const { data: sheetData } = await axios.post(
      `${window.location.origin}/api/slot-sheet`,
      { dispatch: 'LOAD_SHEET', userEmail }
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
    if (!isLoggedIn) return setStatus({ ...status, loading: false })
    // fetch data
    getSlotSheetDataByUserEmail(userEmail)
  }, [isLoggedIn])

  useEffect(() => {
    if (!winPrize) return
    axios.post(`${window.location.origin}/api/slot-sheet`, {
      dispatch: 'WRITE_NEW_LINE',
      userEmail,
      prize: winPrize,
    })
  }, [winPrize])

  return (
    <Layout
      head={{ title: `拉霸機測試` }}
      header={{
        type: 'default',
        data: { sectionsData: sectionsData, topicsData },
      }}
      footer={{ type: 'default' }}
    >
      <>
        {status.loading && <>載入中...</>}
        {status.hasError && <>有錯誤，請重新整理或找工程師</>}
        {status.hasPlayed && <>今天已經玩過囉！</>}
        {!status.loading &&
          !status.hasError &&
          !status.hasPlayed &&
          !winPrize && <button onClick={handleClickSlot}>遊玩！</button>}
        {!winPrize ? null : winPrize === '0' ? (
          <>可惜沒中</>
        ) : (
          <>恭喜你中了 {winPrize} 元！</>
        )}
      </>
    </Layout>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ req, res }) {
  if (ENV === 'prod') {
    return {
      notFound: true,
    }
  } else {
    setPageCache(res, { cachePolicy: 'no-store' }, req.url)
  }

  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }
  let headerData
  try {
    headerData = await fetchHeaderDataInDefaultPageLayout()
  } catch (err) {
    const { graphQLErrors, clientErrors, networkError } = err
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while getting story page data'
    )

    const errorMessage = errors.helpers.printAll(
      annotatingError,
      {
        withStack: true,
        withPayload: true,
      },
      0,
      0
    )
    console.log(
      JSON.stringify({
        severity: 'ERROR',
        message: errorMessage,
        debugPayload: {
          graphQLErrors,
          clientErrors,
          networkError,
        },
        ...globalLogFields,
      })
    )
    throw new Error(errorMessage)
  }
  return {
    props: {
      headerData,
    },
  }
}
