const Path = require('path');
const Webpack = require('webpack');

const Package = require('./package.json');


const ENTRIES = {
  manifest: './sample/manifest.js',
};

module.exports = {

  mode: 'development',

  devtool: 'eval',
  watch: true,

  entry: ENTRIES,

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }],
  },

  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        VERSION: `'${Package.version}'`,
      },
    }),
  ],

  output: {
    filename: '[name].dev.js',
    path: Path.resolve(__dirname, 'build'),
    pathinfo: true,
    sourceMapFilename: '[file].js.map',
  },

  devServer: {
    contentBase: Path.join(__dirname, './build'),
    compress: false,
    port: 3000,
    hot: false,
    disableHostCheck: true,
    before(App) {
      App.get('/', (req, res) => {
        res.sendFile(`${__dirname}/sample/index.html`);
      });
    },
  },
};
