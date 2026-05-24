/** @type {import('next').Next.Config} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Enable type-checking during production builds for strict production readiness
    ignoreBuildErrors: false,
  },
  eslint: {
    // Verify static analysis passes during production builds
    ignoreDuringBuilds: false,
  }
};

module.exports = nextConfig;
