import styled from 'styled-components'
import { minWidth } from '../../styles/breakpoint'
import { sectionColors } from '../../styles/sections-color'

const SectionsWrapper = styled.section`
  font-size: 14px;
  // to hide scrollbar
  height: 36px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  @media ${minWidth.xl} {
    background-color: #064f77;
    font-size: 16px;
    height: auto;
    overflow: visible;
  }
  a {
    display: block;
  }
`
const Sections = styled.div`
  // to hide scrollbar
  height: 48px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: auto;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  @media ${minWidth.xl} {
    width: 100%;
    height: 45px;
    justify-content: center;
    overflow: visible;
  }
`
const Section = styled.div`
  flex: 0 0 auto;
  position: relative;
  cursor: pointer;
  user-select: none;
  line-height: 1.15;
  color: #fff;
  padding-top: 0;
  > a {
    padding: 7px 11px 5px 11px;
    @media ${minWidth.xl} {
      padding: 0;
    }
  }
  @media ${minWidth.xl} {
    line-height: 42px;
    min-width: calc(100% / 11);
    border-top-width: 3px;
    border-top-style: solid;
    &:hover .dropdown {
      display: block;
    }
    &.home {
      display: none;
    }
  }
  @media ${minWidth.md} {
    padding: 0;
    border-top-color: #000;
    ${({ color }) =>
      color &&
      `
    &:hover {
      background: inherit;
      h2 {
        color: ${color};
      }
      & .dropdown a:hover {
        background-color: ${color};
      }
    }
  `}
  }
  &:hover {
    color: #34495e;
    @media ${minWidth.xl} {
      color: #fff;
    }
  }
  ${({ active, color }) =>
    active &&
    color &&
    `
    color: ${color};
  `}
  &.member {
    color: #e51731;
    &:hover {
      color: #db1730;
    }
    &.active {
      color: #e51731;
    }
    @media ${minWidth.xl} {
      color: #fff;
      &:hover {
        color: #fff;
      }
      &.active {
        color: #fff;
      }
    }
  }
`

const SectionDropDown = styled.div`
  position: absolute;
  display: none;
  width: 110px;
  left: 0;
  top: 100%;
  background-color: #333;
  text-align: center;
  color: #fff;
  a {
    line-height: 1.3;
    padding: 13px 10px;
  }
`

const hardcodeJSON = `[{"id":"5fe1770b1b3e3a0f00328cdb","sortOrder":0,"name":"member","topics":[],"style":"feature","extendCats":[],"categories":[{"id":"5a02e0e31a53670d7778b990","isCampaign":false,"isFeatured":false,"isMemberOnly":true,"name":"magazine","style":"feature","title":"動態雜誌","css":"","javascript":"","ogDescription":"","ogTitle":""},{"id":"5a02e0e31a53670d0048b990","name":"somebody","style":"feature","title":"一鏡到底","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","isMemberOnly":true},{"id":"5a02e16c1a53670d0048b992","name":"truth","style":"feature","title":"心內話","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","isMemberOnly":true},{"id":"5a02e1241a53670d0048b991","name":"world","style":"feature","title":"鏡相人間","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","isMemberOnly":true},{"id":"5a02e1941a53670d0048b994","name":"mogul","style":"feature","title":"財經人物","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","isMemberOnly":true},{"id":"57e1e181ee85930e00cad4ed","name":"money","title":"理財","isFeatured":false,"isCampaign":false,"css":"","isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"5d90f43d3c4cad5f87631279","name":"timesquare","style":"feature","title":"時代現場","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","isMemberOnly":true},{"id":"57e1e211ee85930e00cad4f4","name":"celebrity","title":"鏡大咖","isFeatured":false,"isCampaign":false,"css":"","javascript":"","ogDescription":"","ogTitle":"","style":"feature","isMemberOnly":true},{"id":"57e1e252ee85930e00cad4f6","name":"column","title":"影劇專欄","isCampaign":false,"css":"","isFeatured":false,"isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"57dfb75bee85930e00cad4ce","name":"food","title":"美食焦點","isCampaign":false,"css":"","isFeatured":false,"isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"57dfb7b8ee85930e00cad4cf","name":"traveltaiwan","title":"旅行台灣","isCampaign":false,"css":"","isFeatured":false,"isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"57e0124eee85930e00cad4df","name":"seetheworld","title":"看見世界","isCampaign":false,"css":"","isFeatured":false,"isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"57e01261ee85930e00cad4e0","name":"kitchenplay","title":"廚房密技","isCampaign":false,"css":"","isFeatured":false,"isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"581c3a7792c2930d009de311","name":"wine","title":"好酒情報","isFeatured":false,"isCampaign":false,"css":"","isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"6152e21b1347d20f00f11aee","name":"mg","style":"feature","title":"完整全文","css":"","isCampaign":false,"isFeatured":false,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"61d28c196fef6b0f00f839c0","name":"dig","style":"feature","title":"新聞深探","css":"","isCampaign":false,"isFeatured":false,"isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":""}],"title":"會員專區","css":"","description":"","isAudioSiteOnly":false,"isFeatured":true,"javascript":"","ogDescription":"","ogTitle":"","isMemberOnly":false,"created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/5fe1770b1b3e3a0f00328cdb"},"related":{"categories":[{"title":"postcategory","href":"postcategories/5a02e0e31a53670d0048b990"},{"title":"postcategory","href":"postcategories/5a02e16c1a53670d0048b992"},{"title":"postcategory","href":"postcategories/5a02e1241a53670d0048b991"},{"title":"postcategory","href":"postcategories/5a02e1941a53670d0048b994"},{"title":"postcategory","href":"postcategories/57e1e181ee85930e00cad4ed"},{"title":"postcategory","href":"postcategories/5d90f43d3c4cad5f87631279"},{"title":"postcategory","href":"postcategories/57e1e211ee85930e00cad4f4"},{"title":"postcategory","href":"postcategories/57e1e252ee85930e00cad4f6"},{"title":"postcategory","href":"postcategories/57dfb75bee85930e00cad4ce"},{"title":"postcategory","href":"postcategories/57dfb7b8ee85930e00cad4cf"},{"title":"postcategory","href":"postcategories/57e0124eee85930e00cad4df"},{"title":"postcategory","href":"postcategories/57e01261ee85930e00cad4e0"},{"title":"postcategory","href":"postcategories/581c3a7792c2930d009de311"},{"title":"postcategory","href":"postcategories/6152e21b1347d20f00f11aee"},{"title":"postcategory","href":"postcategories/61d28c196fef6b0f00f839c0"}],"extendCats":[],"topics":[]}}},{"id":"57e1e0e5ee85930e00cad4e9","sortOrder":2,"name":"news","style":"feature","categories":[{"id":"57e1e153ee85930e00cad4eb","name":"news","title":"焦點","isFeatured":false,"isCampaign":false,"css":"","javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"5979ac0de531830d00e330a7","name":"political","style":"feature","title":"政治","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5979ac33e531830d00e330a9","name":"city-news","style":"feature","title":"社會","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5979ac22e531830d00e330a8","name":"life","style":"feature","title":"生活","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5e982031a66f9e0f00a03914","name":"boom","style":"feature","title":"鏡爆","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"603628b79c39e0b57218500b","name":"wine1","style":"feature","title":"微醺酩品","css":"","isCampaign":false,"isFeatured":false,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"57e01273ee85930e00cad4e1","name":"shopping","title":"消費","isCampaign":false,"css":"","isFeatured":false,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"5e983017a66f9e0f00a03951","name":"global","style":"feature","title":"國際要聞","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""}],"title":"時事","description":"鏡傳媒的新聞與人物網站，提供最深入的獨家調查報導、爆料偷怕、財經專題、人物專訪  、國際新聞、文學創作與名家影音講堂。","extendCats":[{"id":"57e1e16dee85930e00cad4ec","name":"business","title":"財經","isFeatured":false,"isCampaign":false,"css":"","javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"57e1e181ee85930e00cad4ed","name":"money","title":"理財","isFeatured":false,"isCampaign":false,"css":"","isMemberOnly":true,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"5859e7e5c0ff6d0d00246263","name":"campaign","style":"feature","title":"活動專區","css":"","isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","isCampaign":true},{"id":"57e1e1a3ee85930e00cad4ef","name":"people","title":"人物","isFeatured":false,"isCampaign":false,"css":"","javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"57e1e1d7ee85930e00cad4f1","name":"culture","title":"文化","isFeatured":false,"isCampaign":false,"css":"","javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"5979ac40e531830d00e330aa","name":"comic","style":"feature","title":"動漫遊戲","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"57f37a92a89ee20d00cc4a83","name":"mafalda","title":"瑪法達","isFeatured":false,"isCampaign":false,"css":"","javascript":"","ogDescription":"","ogTitle":"","style":"feature"}],"isFeatured":true,"css":"","javascript":"","ogDescription":"","ogTitle":"","topics":[],"isAudioSiteOnly":false,"isMemberOnly":false,"created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/57e1e0e5ee85930e00cad4e9"},"related":{"categories":[{"title":"postcategory","href":"postcategories/57e1e153ee85930e00cad4eb"},{"title":"postcategory","href":"postcategories/5979ac0de531830d00e330a7"},{"title":"postcategory","href":"postcategories/5979ac33e531830d00e330a9"},{"title":"postcategory","href":"postcategories/5979ac22e531830d00e330a8"},{"title":"postcategory","href":"postcategories/5e982031a66f9e0f00a03914"},{"title":"postcategory","href":"postcategories/603628b79c39e0b57218500b"},{"title":"postcategory","href":"postcategories/57e01273ee85930e00cad4e1"},{"title":"postcategory","href":"postcategories/5e983017a66f9e0f00a03951"}],"extendCats":[{"title":"postcategory","href":"postcategories/57e1e16dee85930e00cad4ec"},{"title":"postcategory","href":"postcategories/57e1e181ee85930e00cad4ed"},{"title":"postcategory","href":"postcategories/5859e7e5c0ff6d0d00246263"},{"title":"postcategory","href":"postcategories/57e1e1a3ee85930e00cad4ef"},{"title":"postcategory","href":"postcategories/57e1e1d7ee85930e00cad4f1"},{"title":"postcategory","href":"postcategories/5979ac40e531830d00e330aa"},{"title":"postcategory","href":"postcategories/57f37a92a89ee20d00cc4a83"}],"topics":[]}}},{"id":"596441d04bbe120f002a319a","sortOrder":3,"name":"businessmoney","topics":[],"style":"feature","extendCats":[],"categories":[{"id":"57e1e16dee85930e00cad4ec","name":"business","title":"財經","isFeatured":false,"isCampaign":false,"css":"","javascript":"","ogDescription":"","ogTitle":"","style":"feature"}],"title":"財經理財","css":"","description":"","isFeatured":true,"javascript":"","ogDescription":"","ogTitle":"","created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/596441d04bbe120f002a319a"},"related":{"categories":[{"title":"postcategory","href":"postcategories/57e1e16dee85930e00cad4ec"},{"title":"postcategory","href":"postcategories/57e1e181ee85930e00cad4ed"}],"extendCats":[],"topics":[]}}},{"id":"57e1e11cee85930e00cad4ea","sortOrder":4,"name":"entertainment","style":"feature","categories":[{"id":"57e1e200ee85930e00cad4f3","name":"latestnews","title":"娛樂頭條","isCampaign":false},{"id":"5c484066315ec51000906149","name":"rookie","style":"feature","title":"試鏡間","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c484090315ec5100090614a","name":"fashion","style":"feature","title":"穿衣鏡","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c4840a9315ec5100090614b","name":"madam","style":"feature","title":"蘭蘭夫人","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c4840c5315ec5100090614c","name":"superstar","style":"feature","title":"我眼中的大明星","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"582937bec6d4cc0d000cbc12","name":"insight","title":"娛樂透視","isFeatured":false,"isCampaign":false},{"id":"5979ac40e531830d00e330aa","name":"comic","style":"feature","title":"動漫遊戲","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""}],"title":"娛樂","description":"鏡傳媒的娛樂網站提供最新最勁爆的娛樂頭條新聞、人物專訪、直播、影劇專欄與影展專區。","extendCats":[{"id":"57dfe40aee85930e00cad4d9","name":"hot-shouts","title":"國際萬花筒","isCampaign":false,"css":"","isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","style":"feature"},{"id":"57e1e224ee85930e00cad4f5","name":"livestream","title":"直播室","isCampaign":false},{"id":"5859e7e5c0ff6d0d00246263","name":"campaign","style":"feature","title":"活動專區","css":"","isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","isCampaign":true}],"isFeatured":true,"css":"","javascript":"","ogDescription":"","ogTitle":"","topics":[],"isAudioSiteOnly":false,"isMemberOnly":false,"created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/57e1e11cee85930e00cad4ea"},"related":{"categories":[{"title":"postcategory","href":"postcategories/57e1e200ee85930e00cad4f3"},{"title":"postcategory","href":"postcategories/5c484066315ec51000906149"},{"title":"postcategory","href":"postcategories/5c484090315ec5100090614a"},{"title":"postcategory","href":"postcategories/5c4840a9315ec5100090614b"},{"title":"postcategory","href":"postcategories/5c4840c5315ec5100090614c"},{"title":"postcategory","href":"postcategories/582937bec6d4cc0d000cbc12"},{"title":"postcategory","href":"postcategories/57e1e252ee85930e00cad4f6"},{"title":"postcategory","href":"postcategories/5979ac40e531830d00e330aa"},{"title":"postcategory","href":"postcategories/57e1e211ee85930e00cad4f4"}],"extendCats":[{"title":"postcategory","href":"postcategories/57dfe40aee85930e00cad4d9"},{"title":"postcategory","href":"postcategories/57e1e224ee85930e00cad4f5"},{"title":"postcategory","href":"postcategories/5859e7e5c0ff6d0d00246263"}],"topics":[]}}},{"id":"5975ab2de531830d00e32b2f","sortOrder":7,"name":"videohub","topics":[],"style":"feature","extendCats":[],"categories":[{"id":"5c6e2ef1315ec5100090870b","name":"video_coverstory","style":"feature","title":"鏡封面","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c6e2f00315ec5100090870c","name":"video_entertainment","style":"feature","title":"鏡娛樂","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c6e2f0e315ec5100090870d","name":"video_society","style":"feature","title":"鏡社會","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c6e2f19315ec5100090870e","name":"video_investigation","style":"feature","title":"鏡調查","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c6e2f24315ec5100090870f","name":"video_finance","style":"feature","title":"財經理財","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c6e2f2e315ec51000908710","name":"video_people","style":"feature","title":"鏡人物","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c6e2f3a315ec51000908711","name":"video_foodtravel","style":"feature","title":"鏡食旅","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c6e2f4a315ec51000908712","name":"video_ent_perspective","style":"feature","title":"娛樂透視","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c6e2f54315ec51000908713","name":"video_carandwatch","style":"feature","title":"汽車鐘錶","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""}],"title":"影音","css":"","description":"","isFeatured":true,"javascript":"","ogDescription":"","ogTitle":"","isAudioSiteOnly":false,"created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/5975ab2de531830d00e32b2f"},"related":{"categories":[{"title":"postcategory","href":"postcategories/5c6e2ef1315ec5100090870b"},{"title":"postcategory","href":"postcategories/5c6e2f00315ec5100090870c"},{"title":"postcategory","href":"postcategories/5c6e2f0e315ec5100090870d"},{"title":"postcategory","href":"postcategories/5c6e2f19315ec5100090870e"},{"title":"postcategory","href":"postcategories/5c6e2f24315ec5100090870f"},{"title":"postcategory","href":"postcategories/5c6e2f2e315ec51000908710"},{"title":"postcategory","href":"postcategories/5c6e2f3a315ec51000908711"},{"title":"postcategory","href":"postcategories/5c6e2f4a315ec51000908712"},{"title":"postcategory","href":"postcategories/5c6e2f54315ec51000908713"}],"extendCats":[],"topics":[]}}},{"id":"60dc0af8b8014d0f008c0a59","sortOrder":8,"name":"mirrorcolumn","topics":[],"style":"feature","extendCats":[],"categories":[{"id":"5fec43af127ff40f00d703ea","name":"mirrorcolumn","style":"feature","title":"名家專欄","css":"","isCampaign":false,"isFeatured":false,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":""}],"title":"論壇","css":"","description":"鏡傳媒的新聞與人物網站，提供最深入的獨家調查報導、爆料偷怕、財經專題、人物專訪  、國際新聞、文學創作與名家影音講堂。","isAudioSiteOnly":false,"isFeatured":true,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":"","created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/60dc0af8b8014d0f008c0a59"},"related":{"categories":[{"title":"postcategory","href":"postcategories/5fec43af127ff40f00d703ea"}],"extendCats":[],"topics":[]}}},{"id":"5971aa8ce531830d00e32812","sortOrder":10,"name":"mafalda","topics":[],"style":"feature","extendCats":[],"categories":[],"title":"瑪法達","css":"","description":"","isFeatured":true,"javascript":"","ogDescription":"","ogTitle":"","created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/5971aa8ce531830d00e32812"},"related":{"categories":[],"extendCats":[],"topics":[]}}},{"id":"5964418a4bbe120f002a3198","sortOrder":11,"name":"culture","topics":[],"style":"feature","extendCats":[],"categories":[{"id":"5c8f76cc6e99d110002a88a5","name":"bookreview","style":"feature","title":"書評","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","heroImage":"5d426351e311f3925c496360"},{"id":"5c8f76f26e99d110002a88a6","name":"culture-column","style":"feature","title":"專欄","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":"","heroImage":"5d426351e311f3925c496360"},{"id":"5c8f771d6e99d110002a88a7","name":"poem","style":"feature","title":"詩","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5c8f76af6e99d110002a88a4","name":"knowledgeprogram","style":"feature","title":"知識好好玩","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"<p>知識是什麼？知識是永無止盡的好奇心，是在假設與驗證間的來回探索，人們為何會傷心？大腦藏著甚麼秘密？說著不同話語為何代表相同的事？《知識好好玩》帶您與哲學、心理學、大腦和語言學專家，一起挖掘現象背後的原理，把複雜困難的知識，用最有趣的聲音告訴您。</p>  | 收聽更多《鏡好聽》獨家內容：https://voice.mirrorfiction.com/<br> | 免費下載《鏡好聽》App: mirrormediafb.pros.is/LY67K<br> | 追蹤《鏡好聽》Facebook：facebook.com/mirrorvoice2019<br> | 追蹤《鏡好聽》Instagram：instagram.com/mirror_voice/<br> | 合作、節目建議歡迎來信 voiceservice@mirrormedia.mg<br>","ogTitle":"","heroImage":"5d83328e3c4cad5f87630129"},{"id":"5d9aa0b43c4cad5f87631f46","name":"booksummary","style":"feature","title":"鏡書摘","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"60a22b30e7e8b30f00f4a490","name":"voice","style":"feature","title":"好聽人物","css":"","isCampaign":false,"isFeatured":false,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":""}],"title":"文化","css":"","description":"","isFeatured":true,"javascript":"","ogDescription":"","ogTitle":"","isAudioSiteOnly":false,"isMemberOnly":false,"created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/5964418a4bbe120f002a3198"},"related":{"categories":[{"title":"postcategory","href":"postcategories/5c8f76cc6e99d110002a88a5"},{"title":"postcategory","href":"postcategories/5c8f76f26e99d110002a88a6"},{"title":"postcategory","href":"postcategories/5c8f771d6e99d110002a88a7"},{"title":"postcategory","href":"postcategories/5c8f76af6e99d110002a88a4"},{"title":"postcategory","href":"postcategories/5d9aa0b43c4cad5f87631f46"},{"title":"postcategory","href":"postcategories/60a22b30e7e8b30f00f4a490"}],"extendCats":[],"topics":[]}}},{"id":"57dfe3b0ee85930e00cad4d7","sortOrder":12,"name":"carandwatch","style":"feature","categories":[{"id":"5b5a930562442b0f0069aaea","name":"car_focus","style":"feature","title":"車壇焦點","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5b5a936462442b0f0069aaeb","name":"car_features","style":"feature","title":"鏡車專題","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5b5a938062442b0f0069aaec","name":"test_drives","style":"feature","title":"靚俥試駕","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"5b5a939862442b0f0069aaed","name":"pit_zone","style":"feature","title":"鏡車經","css":"","isCampaign":false,"isFeatured":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"57e0fc98ee85930e00cad4e3","name":"watchfocus","title":"錶壇焦點","isCampaign":false},{"id":"57e0fcc9ee85930e00cad4e4","name":"watchfeature","title":"鐘錶專題","isCampaign":false},{"id":"57e0fd08ee85930e00cad4e7","name":"blog","title":"編輯幕後","isCampaign":false},{"id":"5ff81e57127ff40f00d71395","name":"NewWatches2021","style":"feature","title":"新錶2021","css":"","isCampaign":false,"isFeatured":false,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"60f53ab95586bf0f00f95d34","name":"luxury","style":"feature","title":"奢華誌","css":"","isCampaign":false,"isFeatured":false,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":""},{"id":"61d3d8f46fef6b0f00f83bb6","name":"NewWatches2022","style":"feature","title":"新錶2022","css":"","isCampaign":false,"isFeatured":false,"isMemberOnly":false,"javascript":"","ogDescription":"","ogTitle":""}],"title":"汽車鐘錶","description":"鏡傳媒以台灣為基地，是一跨平台綜合媒體，包含《鏡週刊》以及下設5大分眾內容的《鏡傳媒》網站，刊載時事、財經、人物、國際、文化、娛樂、美食旅遊、精品鐘錶等深入報導及影音內容。我們以「鏡」為名，務求反映事實、時代與人性。","extendCats":[],"isFeatured":true,"css":"","image":{"id":"58612f2c9255960e001cdf9f","description":"section-watch","createTime":"Mon, 26 Dec 2016 14:54:00 GMT","tags":[],"image":{"filename":"20161226225547-2cc315ffc68388828bd92c9177075e13.png","filetype":"image/png","gcsBucket":"mirrormedia-files","gcsDir":"assets/images/","height":40,"iptc":{"keywords":[]},"resizedTargets":{"tiny":{"height":39,"width":150,"url":"https://storage.googleapis.com/mirrormedia-files/assets/images/20161226225547-2cc315ffc68388828bd92c9177075e13-tiny.png"},"mobile":{"height":40,"width":152,"url":"https://storage.googleapis.com/mirrormedia-files/assets/images/20161226225547-2cc315ffc68388828bd92c9177075e13-mobile.png"},"tablet":{"height":40,"width":152,"url":"https://storage.googleapis.com/mirrormedia-files/assets/images/20161226225547-2cc315ffc68388828bd92c9177075e13-tablet.png"},"desktop":{"height":40,"width":152,"url":"https://storage.googleapis.com/mirrormedia-files/assets/images/20161226225547-2cc315ffc68388828bd92c9177075e13-desktop.png"}},"size":5585,"url":"https://storage.googleapis.com/mirrormedia-files/assets/images/20161226225547-2cc315ffc68388828bd92c9177075e13.png","width":152},"keywords":"","sale":false},"javascript":"","ogDescription":"","ogTitle":"","topics":[],"isAudioSiteOnly":false,"isMemberOnly":false,"created":"Thu, 01 Jan 1970 00:00:00 GMT","updated":"Thu, 01 Jan 1970 00:00:00 GMT","links":{"self":{"title":"section","href":"sections/57dfe3b0ee85930e00cad4d7"},"related":{"image":{"title":"Image","href":"images/58612f2c9255960e001cdf9f"},"categories":[{"title":"postcategory","href":"postcategories/5b5a930562442b0f0069aaea"},{"title":"postcategory","href":"postcategories/5b5a936462442b0f0069aaeb"},{"title":"postcategory","href":"postcategories/5b5a938062442b0f0069aaec"},{"title":"postcategory","href":"postcategories/5b5a939862442b0f0069aaed"},{"title":"postcategory","href":"postcategories/57e0fc98ee85930e00cad4e3"},{"title":"postcategory","href":"postcategories/57e0fcc9ee85930e00cad4e4"},{"title":"postcategory","href":"postcategories/57e0fd08ee85930e00cad4e7"},{"title":"postcategory","href":"postcategories/5ff81e57127ff40f00d71395"},{"title":"postcategory","href":"postcategories/60f53ab95586bf0f00f95d34"},{"title":"postcategory","href":"postcategories/61d3d8f46fef6b0f00f83bb6"}],"extendCats":[],"topics":[]}}}]`

function getCategoryHref(sectionName, categoryName) {
  if (sectionName === 'videohub') {
    return `/video_category/${categoryName}`
  }
  if (categoryName === 'magazine') {
    return '/magazine/'
  }
  return `/category/${categoryName}`
}

export default function NavSections() {
  const sections = JSON.parse(hardcodeJSON)

  return (
    <SectionsWrapper>
      <Sections>
        <Section className="home">
          <a href="/">
            <h2>首頁</h2>
          </a>
        </Section>
        {sections.map((section) => (
          <Section
            key={section.id}
            color={sectionColors[section.name]}
            className={section.name}
          >
            <a href={`/section/${section.name}`}>
              <h2>{section.title}</h2>
            </a>
            <SectionDropDown className="dropdown">
              {section.categories.map((category) => (
                <a
                  key={category.id}
                  href={getCategoryHref(section.name, category.name)}
                >
                  <h3>{category.title}</h3>
                </a>
              ))}
            </SectionDropDown>
          </Section>
        ))}
      </Sections>
    </SectionsWrapper>
  )
}
