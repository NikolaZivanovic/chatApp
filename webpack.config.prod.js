const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const autoprefixer = require('autoprefixer');
const postcssGlobalImport = require('postcss-global-import');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      lodash: 'lodash-es',
      config$: path.resolve(__dirname, 'src/config/config.json'),
      ajax$: path.resolve(__dirname, 'src/util/ajax.js'),
      Config: path.resolve(__dirname, 'src/config'),
      Util: path.resolve(__dirname, 'src/util'),
      Images: path.resolve(__dirname, 'src/assets/images'),
      Fonts: path.resolve(__dirname, 'src/assets/fonts'),
      Common: path.resolve(__dirname, 'src/components/Common'),
    },
  },
  devtool: 'source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/
  entry: path.resolve(__dirname, 'src/index'),
  target: 'web',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    //filename: '[name].[chunkhash].js'
    filename: 'assets/js/[name].[chunkhash].js',
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),    //ignore moments locales which are not used in our bundle!

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[md5:contenthash:hex:20].css',
      allChunks: true,
    }),

    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      favicon: 'src/assets/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
    }),

  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/font-woff',
            name: '[name].[hash].[ext]',
            outputPath: 'assets/fonts'
          }
        }
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/octet-stream',
            name: '[name].[hash].[ext]',
            outputPath: 'assets/fonts'
          }
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: '[name].[hash].[ext]',
              outputPath: 'assets/svg'
            }
          },
          {
            loader: 'image-webpack-loader',
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use:[
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '70-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
            }
          },
        ]
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                /*minimize: true,*/
                sourceMap: true,
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer,
                  postcssGlobalImport,
                ],
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-resources-loader',
              options: {
                resources: [ path.resolve(__dirname, 'src/styles/variables/**/*') ]
              },
            },
          ]
        })
      }
    ]
  }
};
