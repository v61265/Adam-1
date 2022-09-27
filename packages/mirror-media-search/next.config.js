/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/search',
        destination: process.env.URL_MIRROR_MEDIA,
        permanent: true,
      },
      {
        source: '/((?!api|static|favicon.ico|_next|images|sw|search).*)',
        destination: process.env.URL_MIRROR_MEDIA,
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
