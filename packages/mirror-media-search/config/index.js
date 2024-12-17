const delimiter = ','

const URL_MIRROR_MEDIA =
  process.env.URL_MIRROR_MEDIA || 'https://www.mirrormedia.mg'
const URL_MIRROR_MEDIA_V3 =
  process.env.URL_MIRROR_MEDIA_V3 || 'https://dev-next.mirrormedia.mg'
const URL_PROGRAMABLE_SEARCH =
  'https://www.googleapis.com/customsearch/v1/siterestrict'

// The following variables are from environment variables
const ENV = process.env.ENV || 'local'
const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(delimiter)
  : ['http://localhost']
const URL_HOST = process.env.URL_HOST || 'http://localhost:3000/'
const API_PROTOCOL = process.env.API_PROTOCOL || 'http'
const API_PORT = process.env.API_PORT || '8080'
const API_HOST = process.env.API_HOST || 'no-api-host'
const READ_REDIS_HOST = process.env.READ_REDIS_HOST || 'get read redis url'
const WRITE_REDIS_HOST = process.env.WRITE_REDIS_HOST || 'get write redis url'
const REDIS_AUTH = process.env.REDIS_AUTH || 'find redis password'
const REDIS_EX = parseInt(process.env.REDIS_EX) || 60

// The following variables are given values according to different `ENV`
let API_TIMEOUT = 3000
let GA_MEASUREMENT_ID = ''
let GTM_ID = ''
let STATIC_FILE_DOMAIN = ''

switch (ENV) {
  case 'prod':
    API_TIMEOUT = 1500
    GA_MEASUREMENT_ID = 'G-341XFN0675'
    GTM_ID = 'GTM-NCH86SP'
    STATIC_FILE_DOMAIN = 'v3-statics.mirrormedia.mg'
    break
  case 'staging':
    API_TIMEOUT = 1500
    GA_MEASUREMENT_ID = 'G-32D7P3MJ8B'
    GTM_ID = 'GTM-KVDZ27K'
    STATIC_FILE_DOMAIN = 'v3-statics-staging.mirrormedia.mg'
    break
  case 'dev':
    API_TIMEOUT = 5000
    GA_MEASUREMENT_ID = 'G-36HYH6NF6P'
    GTM_ID = 'GTM-PBNLSMX'
    STATIC_FILE_DOMAIN = 'v3-statics-dev.mirrormedia.mg'
    break
  default:
    API_TIMEOUT = 5000
    GA_MEASUREMENT_ID = 'G-36HYH6NF6P'
    GTM_ID = 'GTM-PBNLSMX'
    STATIC_FILE_DOMAIN = 'v3-statics-dev.mirrormedia.mg'
}

let URL_STATIC_HEADER_HEADERS = `https://${STATIC_FILE_DOMAIN}/files/json/header_headers.json`
let URL_STATIC_TOPICS = `https://${STATIC_FILE_DOMAIN}/files/json/header_topics.json`

export {
  API_HOST,
  API_PORT,
  API_PROTOCOL,
  API_TIMEOUT,
  URL_MIRROR_MEDIA,
  URL_MIRROR_MEDIA_V3,
  URL_STATIC_HEADER_HEADERS,
  URL_STATIC_TOPICS,
  URL_PROGRAMABLE_SEARCH,
  URL_HOST,
  READ_REDIS_HOST,
  WRITE_REDIS_HOST,
  REDIS_AUTH,
  REDIS_EX,
  // PROGRAMABLE_SEARCH_ENGINE_ID,
  // PROGRAMABLE_SEARCH_API_KEY,
  CORS_ORIGINS,
  GA_MEASUREMENT_ID,
  GTM_ID,
}
