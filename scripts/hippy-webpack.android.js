const path                        = require('path');
const webpack                     = require('webpack');
const VueLoaderPlugin             = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin    = require('case-sensitive-paths-webpack-plugin');
const pkg                         = require('../package.json');
const manifest                    = require('../dist/android/vendor-manifest.json');
const fs                          = require('fs')
const HippyDynamicImportPlugin = require('@hippy/hippy-dynamic-import-plugin');
const platform = 'android';

module.exports = {
  mode: 'production',
  bail: true,
  entry: {
    index: [path.resolve(pkg.nativeMain)],
  },
  output: {
    filename: `[name].${platform}.js`,
    strictModuleExceptionHandling: true,
    path: path.resolve(`./dist/${platform}/`),
    globalObject: '(0, eval)("this")',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __PLATFORM__: JSON.stringify(platform),
    }),
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest,
    }),
    /**
     * 分包
     */
    new HippyDynamicImportPlugin(),
    /**
     * 不支持分包降级方案
     */
    /*new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),*/
    function() {this.plugin('done', ()=> {
      let stats = {}
      try {
        const jenkins = require("../jenkins.json")
        stats = {vercode:jenkins.vercode,vername:jenkins.vername}
      }catch (e) {
        stats = {vercode:pkg.vercode,vername:pkg.vername}
      }
        fs.writeFileSync(path.join(`./dist/${platform}/`, 'package.json'), JSON.stringify(stats));
      })
    },
    function() {this.plugin('done', ()=> {
      const stats = {imServerUrl:pkg.imServerUrl,usePush:pkg.usePush,useIm:pkg.useIm}
      fs.writeFileSync(path.join(`./dist/${platform}/`, 'extend_params.json'), JSON.stringify(stats));
    })
    },
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
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: 57,
                    },
                  },
                ],
              ],
              plugins: [
                ['@babel/plugin-proposal-class-properties'],
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-transform-runtime', { regenerator: true }],
              ],
            },
          },
          'unicode-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            // if you would like to use base64 for picture, uncomment limit: true
            // limit: true,
            // limit: 8192,
            fallback: 'file-loader',
            name: '[name].[ext]',
            outputPath: 'assets/',
          },
        }],
      },
      {
        test: /\.(xml)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            // stateful xml path
            fallback: 'file-loader',
            name: '[name].[ext]',
            outputPath: 'xml/',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [path.resolve(__dirname, '../node_modules')],
    alias: {
      vue: '@huantv/vue',
      '@': path.resolve('./src'),
      'vue-router': '@extscreen/es-router',
    },
  },
};
