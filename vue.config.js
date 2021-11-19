const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  outputDir: 'lib',
  productionSourceMap: false,
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `
          @import "@p/assets/scss/variable.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@p': path.join(__dirname, 'examples')
      }
    },
    externals: {
      vuex: {
        commonjs: 'vuex',
        commonjs2: 'vuex',
        root: 'Vuex'
      }
    }
  },
  chainWebpack: (config) => {
    if (!isProd) {
      // webpack-html-plugin
      config.plugin('html').tap((options) => {
        options[0].title = '得帆云 MDM自开发平台'
        options[0].minify = {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
        return options
      })
    }
  }
}