const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const nib = require('nib');

module.exports = {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    allowedHosts: 'all',
    client: {
      overlay: true,
      progress: true
    },
    server: 'https',
    // Change this for your project
    port: process.env.PORT || 3998,
    host: process.env.HOST || 'localhost',
    static: {
      directory: path.join(__dirname, '/src/'),
      staticOptions: {},
      publicPath: '/',
      serveIndex: true,
      watch: true
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
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
    symlinks: false,
    fallback: {
      fs: false,
      // for markdown-it plugins
      path: require.resolve("path-browserify"),
      punycode: require.resolve("punycode/"),
      url: false
    }
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
      type: 'asset/resource'
    }, {
      test: /\.styl$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'stylus-loader',
        options: {
          stylusOptions: {
            use: [nib()]
          }
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
  }
};
