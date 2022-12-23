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
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  output: 'standalone',
}

module.exports = nextConfig
