const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/common/components'),
      '@hooks': path.resolve(__dirname, 'src/common/hooks'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@mocks': path.resolve(__dirname, 'src/mocks')
    },
  },
};
