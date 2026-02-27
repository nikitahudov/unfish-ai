import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  allowedDevOrigins: [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unfish.ai',
      },
    ],
  },
};

export default withMDX(nextConfig);
