module.exports = {
    images: {
      domains: ['cdn.dummyjson.com'],
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/devices',
            permanent: true,
          },
        ]
      },
};