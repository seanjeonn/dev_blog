import type { NextConfig } from "next";

const isDev = process.argv.includes("dev");
const isBuild = process.argv.includes("build");

// dev에서는 비차단(watch), build에서는 한 번 동기실행(clean)
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  import("velite").then((m) => m.build({ watch: isDev, clean: !isDev }));
}

const nextConfig: NextConfig = {
  // MDX 이미지 최적화를 위한 도메인 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
