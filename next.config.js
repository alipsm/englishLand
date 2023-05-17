/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  trailingSlash: true,
  images: {
    // loader: 'custom',
    // loaderFile: './app/image.ts',
    // disableStaticImages: false
    output: 'export',
  },
  // reactStrictMode: true,
}

module.exports = nextConfig
