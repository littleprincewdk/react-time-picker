const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';

const plugins = [
  new CleanWebpackPlugin(['./docs/dist']),
  new HtmlWebpackPlugin({
    title: 'React Time Picker',
    template: './docs/index.ejs',
    inject: false,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    }
  }),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['common', 'vendor'],
    minChunks: 2,
  }),
  new ExtractTextPlugin('styles.css'),
];

if (IS_DEV) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  /* plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    })
  ); */
}

module.exports = {
  entry: {
    app: './docs/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'markdown',
    ]
  },
  devtool: IS_DEV ? 'inline-source-map' : false,
  devServer: {
    contentBase: './docs/dist/',
    // hot: IS_DEV,
  },
  plugins,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './docs/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: IS_DEV,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            },
            'postcss-loader',
          ],
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: IS_DEV,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            },
            /* {
              loader: 'less-loader',
              options: {
                paths: [
                  path.resolve(__dirname, 'node_modules')
                ]
              }
            }, */
            'postcss-loader',
            'less-loader',
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ],
      },
      {
        test: /\.md$/,
        use: [
          'raw-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
      {
        test: /\.(ejs|tpl)$/,
        use: [
          'ejs-loader'
        ],
      },
    ],
  },
  resolve: {
    alias: {
      Root: path.resolve(__dirname, './docs/'),
      Site: path.resolve(__dirname, './docs/site/'),
      Component: path.resolve(__dirname, './docs/site/component/'),
      Page: path.resolve(__dirname, './docs/site/page/'),
      Example: path.resolve(__dirname, './docs/example/'),
      MD: path.resolve(__dirname, './docs/markdown/'),
    }
  },
  node: {
    fs: 'empty'
  },
};
