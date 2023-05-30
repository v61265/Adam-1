import { ApolloClient, InMemoryCache } from '@apollo/client'

import { WEEKLY_API_SERVER_HOST } from '../config/index.mjs'

const client = new ApolloClient({
  uri: `https://${WEEKLY_API_SERVER_HOST}/content/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
})

export default client
