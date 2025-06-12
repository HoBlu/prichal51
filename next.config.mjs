/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // обязательно для деплоя
  images: {
    unoptimized: true, // обязательно при static export
  },
};

export default nextConfig;
