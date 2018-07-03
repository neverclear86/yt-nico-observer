const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')


class Services {
  static get SERVICES() {
    return yaml.safeLoad(fs.readFileSync(path.join('/usr/local/app/data/services.yml')))
  }

  /**
   * URLからサービスの特定＋IDの抜き出し
   @returns {object} {kind:種別, site:サイト, id:ID}
   */
  static detect_service(url) {
    // TODO URLからサービスの特定
    const SERVICES = Services.SERVICES
    const urlRegs = SERVICES.map(v => RegExp(v.url))
    const serviceNames = SERVICES.map(v => v.service)
    const index = urlRegs.findIndex(e => url.match(e))
    return {site: serviceNames[index], id: url.match(urlRegs[index])[1]}
  }
}


module.exports = Services
