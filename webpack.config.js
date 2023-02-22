const path = require('path');
const webpack = require('webpack')
require("dotenv").config();

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(wasm)|(bin)|(obj)$/i,
        include: [
          path.resolve(__dirname, 'node_modules/deepar/'),
        ],
        type: 'asset/resource',
      },
      {
        include: [
          path.resolve(__dirname, 'effects/'),
        ],
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@effects': path.resolve(__dirname, 'effects/'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({ API_KEY: process.env.API_KEY, HMS_TOKEN: process.env.HMS_TOKEN }),
    }),
  ],
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 10000000,
  },
};
