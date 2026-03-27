/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/myplanbfragebogen',
  env: { NEXT_PUBLIC_BASE_PATH: '/myplanbfragebogen' },
  images: { unoptimized: true },
  ...(isDev && {
    pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'dev.ts', 'dev.tsx'],
  }),
}

module.exports = nextConfig