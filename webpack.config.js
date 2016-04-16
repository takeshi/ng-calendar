var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './app/client/app.ts',
  output: {
    filename: './build/client/bundle.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new LiveReloadPlugin({})
  ]
}