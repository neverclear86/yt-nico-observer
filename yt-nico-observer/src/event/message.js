const fs = require('fs');
const yaml = require('js-yaml')
const path = require('path')


const COMMANDS = {
  create: "!create",
  edit: "!edit",
  list: "!list",
  exit: "!exit",
}

function help(command) {
  return "間違ってるで"
}


var userSetting = {
  n: 0,
  filename: "",
  mode: "",
}

const questions = [
  "ユーザ名", "ニコニコ UserID", "ニコニコミュニティID", "YoutubeChannelID",
]
var answers = []


module.exports = dataDir => {
  return message => {
    if (message.author.bot) {
      return
    }

    var channel = message.channel
    var input = message.content.split(" ")
    if (userSetting.n == 0) {
      switch (input[0]) {
        case COMMANDS.create:
          if (!input[1]) {
            channel.send(help(COMMANDS.create))
            return
          }
          channel.send(questions[0])
          userSetting.filename = input[1]
          userSetting.n++
          userSetting.mode = COMMANDS.create
          break
        case COMMANDS.edit:
          break
        case COMMANDS.list:
          var ret = fs.readdirSync(dataDir).map(p => path.basename(p, '.yml')).join('\n')
          channel.send(ret || "No data.")
          break
        default:
          break
      }
    } else {
      if (message.content.startsWith(COMMANDS.exit) || userSetting.n >= questions.length) {
        if (userSetting.n >= questions.length) {
          // TODO 設定
          answers[userSetting.n - 1] = message.content
          console.log(answers)
          var data = {
            name: answers[0],
            niconico: {
              userId: answers[1],
              community: answers[2],
            },
            youtube: {
              channel: answers[3],
            },
          }
          fs.writeFileSync(path.join(dataDir, userSetting.filename + ".yml"), yaml.safeDump(data, {compact: true}))
        }
        userSetting.n = 0
        answers = []
        return
      }

      answers[userSetting.n - 1] = message.content
      channel.send(questions[userSetting.n])
      userSetting.n++
    }
  }
}
