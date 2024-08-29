if (!URL.canParse(process.env.WORDPRESS_API_URL)) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const { protocol, hostname, port, pathname } = new URL(
  process.env.WORDPRESS_API_URL
);

console.log(`WordPress API URL: ${protocol}//${hostname}:${port}${pathname}`);

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `/**`,
      },
      {
        protocol: "https",
        hostname: "server.web-space.ie",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};
