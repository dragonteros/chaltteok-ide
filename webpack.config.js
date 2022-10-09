const production = process.env.NODE_ENV === 'production'

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: production ? 'production' : 'development',
  devtool: production ? 'cheap-module-source-map' : 'inline-source-map',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    static: {
      directory: __dirname,
    },
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
}
