export default {}

/**
 * @typedef {import('../gql/section').Section & {
 *  id: String,
 *  name: String,
 *  slug: String,
 * }} CategorySection
 */

/**
 * @typedef {import('../gql/category').Category & {
 *  id: String,
 *  name: String,
 *  slug: String,
 *  sections: CategorySection,
 * }} Category
 */
