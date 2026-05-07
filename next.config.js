/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // هذا السطر يسمح للموقع بالعمل كصفحة ثابتة وسريعة جداً
  output: 'export', 
  images: { unoptimized: true }
}

module.exports = nextConfig
