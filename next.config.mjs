/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	webpack: (config) => {
		config.externals.push("@prisma/client");
		return config;
	},
};

export default nextConfig;
