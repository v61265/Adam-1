export default function Dropdown({ authors, displayPodcastsByAuthor }) {
  const handleAuthorSelect = (selectedAuthor) => {
    displayPodcastsByAuthor(selectedAuthor)
  }
  return (
    <select onChange={(e) => handleAuthorSelect(e.target.value)}>
      <option value="">全部</option>
      {authors.map((author, index) => (
        <option key={index} value={author}>
          {author}
        </option>
      ))}
    </select>
  )
}
