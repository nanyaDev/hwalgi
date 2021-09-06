// ? does images need additional configuration
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/catalog',
        },
      ],
    };
  },
};
