const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const dataDir = process.env.DATA_DIR

class User {
  constructor(name = null) {
    this.name = name
    this.services = {video: {}, live: {},}
  }

  add(site, id) {
    // var s = Services.detect_service(url)
    // this.services[s.kind][s.site] = s.id
  }

  get obj() {
    return {
      name: this.name,
      services: this.services,
    }
  }

  save() {
    var y = yaml.safeDump(this.obj, {compact: true})
    fs.writeFileSync(path.join(dataDir, this.name) + '.yml', y)
  }

  /**
   * ファイルからロードする
   */
  static load(filename) {
    var data = yaml.safeLoad(fs.readFileSync(path.join(dataDir, filename) + '.yml'))
    var ret = new User()
    ret.name = data.name
    data.urls.forEach(u => ret.add(u))
    return ret
  }

  static get list() {
    return fs.readdirSync(dataDir).map(p => path.basename(p, '.yml'))
  }
}


module.exports = User
