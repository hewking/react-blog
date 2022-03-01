
const withCSS = require('@zeit/next-css')

// module.exports = {
//   reactStrictMode: true,
// }

module.exports = withCSS({
  cssModules: true,
  reactStrictMode: true,
})