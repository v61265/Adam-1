import { PRIVATE_KEY, PRIVATE_KEY_ID } from '../../config/index.mjs'
const { SearchServiceClient } = require('@google-cloud/discoveryengine').v1beta

const credentials = {
  type: 'service_account',
  project_id: 'mirrormedia-1470651750304',
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: 'vertex-ai@mirrormedia-1470651750304.iam.gserviceaccount.com',
  client_id: '101625834477968598875',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/vertex-ai%40mirrormedia-1470651750304.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
}

const client = new SearchServiceClient({
  apiEndpoint: 'discoveryengine.googleapis.com',
  credentials,
})

export default async function searchWithClientLibrary() {
  const projectId = '983956931553'
  const location = 'global'
  const collectionId = 'default_collection'
  const engineId = 'site-search_1733818326957'
  const servingConfigId = 'default_search'
  const searchQuery = 'Google'

  const name = `projects/${projectId}/locations/${location}/collections/${collectionId}/engines/${engineId}/servingConfigs/${servingConfigId}`

  const request = {
    query: searchQuery,
    pageSize: 10,
    queryExpansionSpec: { condition: 'AUTO' },
    spellCorrectionSpec: { mode: 'AUTO' },
    contentSearchSpec: { snippetSpec: { returnSnippet: true } },
    servingConfig: name,
  }

  try {
    const response = await client.search(request)
    console.log('Search Results:', response)
  } catch (error) {
    console.error('Error during search:', error.message)
  }
}

searchWithClientLibrary()
