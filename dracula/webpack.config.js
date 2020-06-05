const path = require('path');
module.exports = {
  mode: 'development',
  // devtool: 'inline-source-map',
  entry: './src/app.ts',
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, './resources/js'),
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/, loader: 'ts-loader'
      }
    ]
  }
};