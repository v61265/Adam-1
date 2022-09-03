const API_PORT = '8080'
const API_PROTOCOL = 'http'
const URL_MIRROR_MEDIA =
  process.env.URL_MIRROR_MEDIA || 'https://www.mirrormedia.mg'
const URL_STATIC_COMBO_SECTIONS =
  'https://storage.googleapis.com/statics.mirrormedia.mg/json/sections.json'

// The following variables are from environment variables
const ENV = process.env.ENV || 'local'

// The following variables are given values according to different `ENV`
let API_HOST = ''
let API_TIMEOUT = 5000

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
}
