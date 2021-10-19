const {
  ENVIRONMENT,
  API_URL,
} = require('config');
const withImages = require('next-images');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const nextConfig = withImages({
  i18n: {
    locales: ['en', 'ru', 'by'],
    defaultLocale: 'ru',
  },
  react: {
    useSuspense: false,
    wait: true
  }
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

module.exports = nextConfig
