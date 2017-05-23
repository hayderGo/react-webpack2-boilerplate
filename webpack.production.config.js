const webpack = require('webpack');
const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const dashboard = new Dashboard();

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    vendor: ['react', 'react-dom', 'react-router'],
    main: path.resolve(__dirname, 'app/main.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: '[name]_[chunkHash:8].js',
    chunkFilename: '[name]_[chunkHash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [AutoPrefixer]
              }
            },
            'less-loader'
            // {
            //   loader: 'less-loader',
            //   options: {
            //     lessPlugins: [
            //       new lessPrefixer({
            //         browsers: ['last 2 versions']
            //       })
            //     ]
            //   }
            // }
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'app'),
        exclude: /node_modules/,
        use: [
          'babel-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'build')]),
    new HtmlWebpackPlugin({
      template: './app/template.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 修复webpack的chunkhash不以chunk文件实际内容为准的问题
    new WebpackMd5Hash(),
    new ExtractTextPlugin({
      filename: 'main_[chunkHash:8].css',
      disable: false,
      allChunks: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: './app/index.html', to: 'index.html'
    //   },
    // {
    //   from: './app/main.css', to: 'main.css'
    // }
    // ]),
    new DashboardPlugin(dashboard.setData)
  ]
};
