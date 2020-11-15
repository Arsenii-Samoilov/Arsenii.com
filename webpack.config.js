const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: ['./src/js/main.ts', './src/css/style.css'],
    about: ['./src/css/style.css'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool:
    process.env.NODE_ENV !== 'production' ? 'eval-cheap-source-map' : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.hbs'),
      minify: false,
      template: path.resolve('./src/views/index.hbs'),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/about.hbs'),
      minify: false,
      template: path.resolve('./src/views/about.hbs'),
      excludeChunks: ['main'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: path.resolve(__dirname, 'dist/images') },
        { from: 'src/views/error.hbs', to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
};
