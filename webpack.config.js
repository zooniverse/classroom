const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const nib = require('nib');

module.exports = {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, '/src/'),
    disableHostCheck: true,  //Allow access using custom host names, e.g. local.zooniverse.org:3998, which is necessary for testing certain API calls.
    // hot: true,
    inline: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    // Change this for your project
    port: process.env.PORT || 3998,
    host: process.env.HOST || 'localhost'
  },

  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    path.join(__dirname, 'src/index.jsx')
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: ''
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new DashboardPlugin({ port: 3999 })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.styl'],
    modules: ['.', 'node_modules'],
    symlinks: false
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      use: [
        'babel-loader'
        // 'eslint-loader' uncomment if you want to use eslint while compiling
      ]
    }, {
      test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
      use: 'file-loader?name=[name].[ext]'
    }, {
      test: /\.styl$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'stylus-loader',
        options: {
          use: [nib()]
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          includePaths: [
            path.resolve(__dirname, 'node_modules/zoo-grommet/dist'),
            path.resolve(__dirname, 'node_modules/zooniverse-react-components/lib')
          ]
        }
      }]
    }]
  },

  node: {
    fs: 'empty'
  }
};
