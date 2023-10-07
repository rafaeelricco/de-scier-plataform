/** @type {import('next').NextConfig} */
const nextConfig = {
   webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

      config.module.rules.push(
         // Reapply the existing rule, but only for svg imports ending in ?url
         {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/ // *.svg?url
         },
         // Convert all other *.svg imports to React components
         {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            resourceQuery: { not: /url/ }, // exclude if *.svg?url
            use: ['@svgr/webpack']
         }
      )

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i

      return config
   },
   compiler: {
      removeConsole: process.env.NODE_ENV === 'prod' ? true : false
   },
   images: {
      domains: ['random.imagecdn.app']
   },
   // See more in: https://nextjs.org/docs/app/api-reference/next-config-js/redirects
   async redirects() {
      return [
         {
            source: '/',
            destination: '/summary',
            permanent: true
         }
      ]
   }
}

module.exports = nextConfig
