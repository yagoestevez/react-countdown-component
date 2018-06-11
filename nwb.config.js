module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactCountdownComponent',
      externals: {
        react: 'React'
      }
    }
  }
}
