const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const path = require('path')

module.exports = (env, argv) => {
  const mode = argv.mode || 'production'
  return {
    mode,
    watch: mode === 'development',

    entry: {
      main: ['./src/js/main.js', './src/scss/main.scss'],
    },

    output: {
      path: path.join(__dirname, 'app/public/'),
      filename: 'js/[name].js',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'resolve-url-loader',
            'sass-loader',
          ],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
      new LiveReloadPlugin(),
    ],
  }
}
