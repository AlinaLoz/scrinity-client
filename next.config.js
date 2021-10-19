const {
  ENVIRONMENT,
  API_URL,
  STATIC_FILES,
} = require('config');
const withImages = require('next-images');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { i18n } = require('./next-i18next.config');

const nextConfig = withImages({
  i18n,
  publicRuntimeConfig: {
    ENVIRONMENT,
    API_URL,
    STATIC_FILES,
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

module.exports = nextConfig
