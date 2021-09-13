// ? does images need additional configuration
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'i.scdn.co'],
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
