import { ShareButton } from '@readr-media/share-button'

export default function ShareIcons() {
  function handleClickButton() {
    console.log('點擊分享按鈕')
  }
  function handleClickLine() {
    console.log('點擊Line分享按鈕')
  }
  function handleClickFB() {
    console.log('點擊Facebook分享按鈕')
  }
  function handleClickLink() {
    console.log('點擊複製連結按鈕')
  }

  return (
    <>
      <ShareButton
        pathColor="#FFF"
        direction="vertical"
        className="share-button"
        onClick={handleClickButton}
        LineClick={handleClickLine}
        FbClick={handleClickFB}
        LinkClick={handleClickLink}
      />
    </>
  )
}
