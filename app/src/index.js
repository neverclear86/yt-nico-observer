const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const client = new Discord.Client()
const yaml = require('js-yaml')

const nicovideo = require('./niconico/video')

const dataDir = process.env.DATA_DIR

client.on('ready', () => {
  console.log('ログインしました。')
})

client.on('message', require('./event/message'))

client.setInterval(() => {
  // fs.readdirSync(dataDir).forEach(e => {
  //   var data = yaml.safeLoad(fs.readFileSync(dataDir + e))
  //
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
  // })
}, 1000 * 5)

client.login(process.env.BOT_TOKEN)
