import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // sharp 預設依主機核心數開執行緒，雲端主機核心多會大幅墊高 RAM；小站單執行緒足夠
    imgOptConcurrency: 1,
  },
};

export default nextConfig;
