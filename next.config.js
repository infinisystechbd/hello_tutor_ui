// next.config.js

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_API_AUTH_TOKEN_URL: process.env.NEXT_API_AUTH_TOKEN_URL,
    NEXT_API_URL: process.env.NEXT_API_URL,
    NEXT_APP_URL: process.env.NEXT_APP_URL,
    NEXT_APP_API_URL: process.env.NEXT_APP_API_URL
  },
  images: {
    domains: ['png.pngtree.com'], // Add the domain here
  },
};
