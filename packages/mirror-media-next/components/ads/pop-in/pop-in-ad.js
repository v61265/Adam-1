/**
 * This is the base component to set id for Pop In script to insert HTML.
 * Wrap this component by levarge the styled-components function [styling any component](https://styled-components.com/docs/basics#styling-any-component)
 * to maintain Pop In's ad as separate component.
 * Check ~/components/ads/pop-in/pop-in-ad-in-related-list.js for the example.
 * @param {Object} props
 * @param {string} props.popInId - Pop In id to connect to Pop In script
 * @param {string} [props.className] - styled-components property to set style for a React Component
 * @returns {React.ReactElement}
 */
export default function PopInAd({ popInId, className }) {
  return <div className={className} id={popInId} />
}
