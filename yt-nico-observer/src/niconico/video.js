const request = require('request-promise')
const xml2json = require('xml-js').xml2json
const fs = require('fs');


module.exports = function(user) {
  const userId = user.niconico.userId

  return request.get({
    url: "http://www.nicovideo.jp/user/" + userId + "/video?rss=atom",
  }).then(body => {
    body = JSON.parse(xml2json(body, {compact: true})).feed.entry
    var videoUrls = body.map(v => {
      return {
        url: v.link._attributes.href,
        title: v.title._text,
      }
    })
    var prev = user.lastVideo.niconico
    if (prev && prev != "") {
      var n = videoUrls.findIndex(v => v.url == prev)
      return videoUrls.slice(0, n).reverse()
    } else {
      return videoUrls.reverse()
    }
  }).catch(err => {
    console.error(err)
  })
}
