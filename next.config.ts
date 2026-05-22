import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lhu.edu.vn",
				pathname: "/Data/News/**",
			},
			{
				protocol: "https",
				hostname: "cdn.phototourl.com",
				pathname: "/free/**",
			},
			{
				protocol: "https",
				hostname: "randomuser.me",
				pathname: "/api/portraits/**",
			},
		],
	},
};

export default nextConfig;
