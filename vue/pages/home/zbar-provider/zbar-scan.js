// eslint-disable-next-line no-new-func
const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')

let zbarScan = function () {
  return Promise.reject(new Error('server side render not support'))
}

if (isBrowser()) {
  zbarScan = require('zbar-qr')
}

module.exports = zbarScan
