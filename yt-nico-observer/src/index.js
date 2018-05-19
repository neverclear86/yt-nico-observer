const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const client = new Discord.Client()
const yaml = require('js-yaml')
const nicovideo = require('./niconico/video')
// const user = require('./settings/user-setting.js')


client.on('ready', () => {
  console.log('ログインしました。')
})


var userSetting = {
  n: 0,
  filename: "",
  data: {
    niconico: {},
    youtube: {},
  },
}

const questions = [
  "ユーザ名", "ニコニコ UserID", "ニコニコミュニティID", "YoutubeChannelID",
]
var answers = []


client.on('message', message => {
  // TODO ユーザの設定などをDiscordからできるようにする
  // if (message.content.startsWith('!ping')) {
  //   message.channel.send('pong!') // ここに指定した文字列がボットの発言になる
  // }
  var channel = message.channel
  var command = message.content.split(" ")

  if (userSetting.n == 0) {
    switch (command[0]) {
      case "!create":
        channel.send(questions[0])
        userSetting.filename = command[1]
        userSetting.n++
        break
      case "!edit":
        break
      case "!list":
        var ret = fs.readdirSync(path.basename('/var/data/'), '.yml').join('\n')
        channel.send(ret)
        break
      default:
        break
    }
  } else {
    if (message.content.startsWith('!exit') || userSetting.n >= questions.length) {
      if (userSetting.n >= questions.length) {
        // TODO 設定
      }
      userSetting.n = 0
      answers = []
      return
    }

    answers[userSetting.n - 1] = message.content
    channel.send(questions[userSetting.n])
    userSetting.n++
  }
})


// const dataDir = '/var/data/'
// client.setInterval(() => {
//   fs.readdirSync(dataDir).forEach(e => {
//     var data = yaml.safeLoad(fs.readFileSync(dataDir + e))
//
//     // ニコニコ動画
//     nicovideo(data).then(videos => {
//       if (videos.length == 0) {
//         return
//       }
//       // TODO チャンネルで発言する
//       videos.forEach(console.log)
//       data.lastVideo.niconico = videos.pop().url
//       fs.writeFileSync(dataDir + e, yaml.safeDump(data))
//     })
//
//     // TODO Youtube動画
//
//     // TODO ニコニコ生放送
//
//     // TODO Youtube生放送
//   })
// }, 1000 * 5)

client.login(process.env.BOT_TOKEN)
