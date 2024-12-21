/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack(config, { dev, isServer }) {
        if (!isServer && dev) {
          config.devtool = 'source-map';  // For better debugging in development
        }
        return config;
      }
};

export default nextConfig;
