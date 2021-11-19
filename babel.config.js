const elementUIComponentPlugin = [
  'component',
  {
    libraryName: 'element-ui',
    styleLibraryName: '../packages/theme-chalk/src',
    ext: '.scss'
  },
  'element-ui'
]

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    elementUIComponentPlugin
  ]
}
