const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'

// dev - cheap-module-source-map
// prod - souce-map

module.exports = {
  mode,
  devtool:'cheap-module-source-map',
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
        loader: 'babel-loader'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
      hash: process.env.NODE_ENV === 'production',
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({ filename: `[name].css` })] : []),
  ],
  optimization: {
    minimizer:
      mode === 'production'
        ? [
            new CssMinimizerPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
  },
}
