const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const User = require('/app/user')


function fetchActivity() {
  User.getAllUser().forEach(async u => {
    var nicoVideos = await require('/app/niconico/video')(u)

  })
  //   // ニコニコ動画
  //   nicovideo(data).then(videos => {
  //     if (videos.length == 0) {
  //       return
  //     }
  //     // TODO チャンネルで発言する
  //     videos.forEach(console.log)
  //     data.lastVideo.niconico = videos.pop().url
  //     fs.writeFileSync(dataDir + e, yaml.safeDump(data, {compact: true}))
  //   })
  //
  //   // TODO Youtube動画
  //
  //   // TODO ニコニコ生放送
  //
  //   // TODO Youtube生放送
}
