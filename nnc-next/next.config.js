module.exports = {
  rewrites: () => [
    {
      source: '/uploads/:path',
      destination: 'http://localhost:1337/uploads/:path'
    }
  ],
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};
