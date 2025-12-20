// Browsersync configuration for proxying mementomori.social
const variant = process.env.VARIANT || 'mastodon-bird-ui';

module.exports = {
  proxy: {
    target: 'https://mementomori.social',
    proxyOptions: {
      changeOrigin: true,
      secure: true,
    },
  },
  port: 3999,
  files: ['dist/**/*.css'],
  https: true,
  serveStatic: [
    {
      route: '/mastodon-bird-ui',
      dir: 'dist',
    },
  ],
  snippetOptions: {
    rule: {
      match: /<\/head>/i,
      fn: function (snippet, match) {
        const cssInjection = `
    <link rel="stylesheet" href="/mastodon-bird-ui/${variant}.css">
`;
        return cssInjection + snippet + match;
      },
    },
  },
  open: false,
  notify: true,
  logLevel: 'info',
  logPrefix: 'Bird UI (mementomods)',
  reloadDelay: 0,
  reloadDebounce: 500,
  injectChanges: true,
  watchEvents: ['change'],
  ignore: ['node_modules', '.git', '*.map'],
};
