const delimiter = ','

const API_PORT = '8080'
const API_PROTOCOL = 'http'
const URL_MIRROR_MEDIA =
  process.env.URL_MIRROR_MEDIA || 'https://www.mirrormedia.mg'
const URL_STATIC_COMBO_SECTIONS =
  'https://storage.googleapis.com/statics.mirrormedia.mg/json/sections.json'
const URL_PROGRAMABLE_SEARCH =
  'https://www.googleapis.com/customsearch/v1/siterestrict'

// The following variables are from environment variables
const ENV = process.env.ENV || 'local'
const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? env.CORS_ORIGINS.split(delimiter)
  : ['http://localhost']
const URL_HOST = process.env.URL_HOST || 'http://localhost:3000/'
const REDIS_HOST = process.env.REDIS_HOST || 'get redis url'
const REDIS_AUTH = process.env.REDIS_AUTH || 'find redis password'
const REDIS_EX = parseInt(process.env.REDIS_EX) || 60

// The following variables are given values according to different `ENV`
let API_HOST = ''
let API_TIMEOUT = 5000
let PROGRAMABLE_SEARCH_ENGINE_ID =
  process.env.PROGRAMABLE_SEARCH_ENGINE_ID || 'SEARCH_ENGINE_ID'
let PROGRAMABLE_SEARCH_API_KEY =
  process.env.PROGRAMABLE_SEARCH_API_KEY || 'API_KEY'

switch (ENV) {
  case 'prod':
    API_HOST = 'tr-projects-rest'
    API_TIMEOUT = 1500
    break
  case 'staging':
    API_HOST = 'tr-projects-rest'
    API_TIMEOUT = 1500
    break
  case 'dev':
    API_HOST = 'rest-service'
    API_TIMEOUT = 5000
    break
  default:
    API_HOST = process.env.API_HOST || 'api-host'
    API_TIMEOUT = 5000
}

export {
  API_HOST,
  API_PORT,
  API_PROTOCOL,
  API_TIMEOUT,
  URL_MIRROR_MEDIA,
  URL_STATIC_COMBO_SECTIONS,
  URL_PROGRAMABLE_SEARCH,
  URL_HOST,
  REDIS_HOST,
  REDIS_AUTH,
  REDIS_EX,
  PROGRAMABLE_SEARCH_ENGINE_ID,
  PROGRAMABLE_SEARCH_API_KEY,
  CORS_ORIGINS,
}
