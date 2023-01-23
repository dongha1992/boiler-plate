const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const mode = process.env.NODE_ENV || 'development';
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode,
  devtool: 'source-map',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: isDev ? '개발' : '',
      },
      minify: !isDev
        ? {
            collapseWhitespace: true,
            removeComments: true,
          }
        : false,
      hash: !isDev,
    }),
    new CleanWebpackPlugin(),
    ...(!isDev ? [new MiniCssExtractPlugin({ filename: `[name].css` })] : []),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: true,
      useEslintrc: true,
      cache: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-report.json',
    }),
  ],
  optimization: {
    minimizer: !isDev
      ? [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
        ]
      : [],
  },
};
