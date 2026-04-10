import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lhu.edu.vn",
				pathname: "/Data/News/**",
			},
		],
	},
};

export default nextConfig;
