/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow the Base44 preview origin to reach Next dev assets / HMR.
  allowedDevOrigins: process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? ['3000-' + process.env.BASE44_PUBLIC_HOST_SUFFIX]
    : [],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }],
  },
};

export default nextConfig;
