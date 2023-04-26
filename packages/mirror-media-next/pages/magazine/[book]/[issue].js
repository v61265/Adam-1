import { useRouter } from 'next/router'

export default function BookBIssuePublish() {
  const router = useRouter()
  const { book, issue } = router.query
  return (
    <div>
      <h1>
        Hi {book} - {issue}
      </h1>
    </div>
  )
}
