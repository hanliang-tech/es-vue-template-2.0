const path = require('path')
const ESDynamicImportPlugin = require('@extscreen/es3-dynamic-import-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const platform = 'android'
const pkg = require('../package.json')

module.exports = {
  mode: 'production',
  bail: true,
  entry: {
    index: [path.resolve(pkg.main)]
  },
  output: {
    filename: `[name].${platform}.js`,
    path: path.resolve(`./dist/${platform}/`),
    strictModuleExceptionHandling: true,
    globalObject: '(0, eval)("this")',
    assetModuleFilename: '[hash][ext][query]',
    // CDN path can be configured to load children bundles from remote server
    // publicPath: 'https://xxx/hippy/hippyVueNextDemo/',
    publicPath: './'
  },
  optimization: {
    moduleIds: 'named',
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      terserOptions: {
        output: {
          // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
          beautify: false,
          // 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          comments: false
        },
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
          pure_funcs: ['console.log']
        }
      },
      extractComments: false
    })],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
          reuseExistingChunk: true,
          name: 'vendor',
          filename: 'vendor.android.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        HOST: JSON.stringify(process.env.DEV_HOST || '127.0.0.1'),
        PORT: JSON.stringify(process.env.DEV_PORT || 38989)
      },
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __PLATFORM__: null,
      __DEV__: true
    }),
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new ESDynamicImportPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
          'unicode-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          '@huantv/vue-css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'assets/',
          publicPath: 'assets/'
        }
      },
      {
        test: /\.t|js$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              target: 'es2015'
            }
          }
        ]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: (() => {
      const aliases = {
        vue: '@huantv/vue',
        src: path.resolve('./src'),
        '@': path.resolve('./src'),
      }
      return aliases
    })()
  }
}
