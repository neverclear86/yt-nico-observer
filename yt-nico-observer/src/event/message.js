const fs = require('fs');
const yaml = require('js-yaml')
const path = require('path')
const isUrl = require('is-url')

const Services = require('../services')
const User = require('../user')


const dataDir = process.env.DATA_DIR

const COMMANDS = {
  create: "!create",
  edit: "!edit",
  remove: "!remove",
  list: "!list",
  exit: "!exit",
  end: "!end",
}

const MODES = {
  default: 0,
  create: 1,
  edit: 2,
  remove: 3,
}

function help(command) {
  return "間違ってるで"
}


var user = null
var mode = 0


function default_message(message) {
  var channel = message.channel
  var input = message.content.split(" ")
  switch (input[0]) {
    case COMMANDS.create:
      if (!input[1]) {
        channel.send(help(COMMANDS.create))
        return
      }
      user = new User(input[1])
      channel.send('以下のURLを1つ以上入力してください("' + COMMANDS.end + '"で終了)')
      channel.send('ニコニコユーザーページ')
      channel.send('YouTubeチャンネルページ')
      mode = MODES.create
      break
    case COMMANDS.edit:
      break
    case COMMANDS.list:
      channel.send(User.list.join('\n') || "No data.")
      break
    default:
      break
  }
}


function create(message) {
  var channel = message.channel
  if (isUrl(message.content)) {
    var ret = Services.detect_service(message.content)
    if (!ret.id) {
      channel.send('そのURLは知らない')
      return
    }
    channel.send(ret.site + 'を認識  ID: ' + ret.id)
    user.add(ret.site, ret.id)
  } else if (message.content == COMMANDS.end) {
    mode = MODES.default
    user.save()
    user = null
  } else {
    channel.send('URL入れろ。終わるなら"' + COMMANDS.end + '"だ')
  }
}

module.exports = message => {
  if (message.author.bot) {
    return
  }

  switch (mode) {
    case MODES.default:
      default_message(message)
      break
    case MODES.create:
      create(message)
      break
    case MODES.edit:
      break
    case MODES.remove:
      break
    default:
      break
  }
}
