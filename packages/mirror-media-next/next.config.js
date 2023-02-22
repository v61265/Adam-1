const ENV = process.env.NEXT_PUBLIC_ENV || 'local'
let DONATION_PAGE_URL = ''

switch (ENV) {
  case 'prod':
  case 'staging':
    DONATION_PAGE_URL = 'https://mirrormedia.oen.tw/'
    break
  case 'dev':
    DONATION_PAGE_URL = 'https://mirrormedia.testing.oen.tw/'

    break
  default:
    DONATION_PAGE_URL = 'https://mirrormedia.testing.oen.tw/'
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  images: {
    // https://nextjs.org/docs/api-reference/next/image#remote-patterns
    remotePatterns: [
      {
        hostname: '*', //Temporary setting, should assign to specif hostname when our domain is decided
      },
    ],
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader',
          },
        ],
      }
    )

    return config
  },
  async redirects() {
    return [
      // currently, donation page will redirect user to external page
      {
        source: '/donate',
        destination: DONATION_PAGE_URL,
        permanent: true,
      },
    ]
  },

  output: 'standalone',
}

module.exports = nextConfig
