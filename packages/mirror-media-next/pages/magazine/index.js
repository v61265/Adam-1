import Link from 'next/link'

const mockData = {
  A: {
    1: {
      title: 'Book A, Issue 1',
      content: 'This is the content for Book A, Issue 1.',
    },
    2: {
      title: 'Book A, Issue 2',
      content: 'This is the content for Book A, Issue 2.',
    },
  },
  B: {
    1: {
      title: 'Book B, Issue 1',
      content: 'This is the content for Book B, Issue 1.',
    },
    2: {
      title: 'Book B, Issue 2',
      content: 'This is the content for Book B, Issue 2.',
    },
  },
}

export default function Magazine() {
  const books = Object.keys(mockData)

  return (
    <div>
      <h1>Magazine</h1>
      <ul>
        {books.map((book) => {
          const issues = Object.keys(mockData[book])

          return issues.map((issue) => (
            <li key={issue}>
              <Link href={`/magazine/Book_${book}/${book}${issue}-Publish`}>
                {`Book ${book}, Issue ${issue}`}
              </Link>
            </li>
          ))
        })}
      </ul>
    </div>
  )
}
