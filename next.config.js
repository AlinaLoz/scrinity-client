const {
  ENVIRONMENT,
  API_URL,
} = require('config');
const withImages = require('next-images');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withImages({
  publicRuntimeConfig: {
    ENVIRONMENT,
    API_URL,
  },
  trailingSlash: true,
  webpack(cfg, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      cfg.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return cfg;
  },
});
