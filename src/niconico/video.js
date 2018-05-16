const request = require('request-promise')
const xml2json = require('xml-js').xml2json

// var url = "http://api.search.nicovideo.jp/api/v2/video/contents/search"
//
// var params = {
//   q: "ごまぞぅ",
//   targets: "title,description,tags",
//   fields: "contentId,title",
//   _sort: "-startTime",
//   _context: "bot",
// }

const gomazo_id = 58774852

request.get({
  url: "http://api.search.nicovideo.jp/api/v2/video/contents/search",
  qs: {
    q: "ごまぞぅ",
    targets: "title,description,tags",
    fields: "contentId,title",
    _sort: "-startTime",
    _context: "bot",
  },
  json: true,
}).then(body => {
  // console.log(body)
  return request.get({
    url: "http://ext.nicovideo.jp/api/getthumbinfo/" + body.data[0].contentId
  })
}).then(body => {
  body = JSON.parse(xml2json(body, {compact: true})).nicovideo_thumb_response.thumb
  console.log(body)

  id = body.user_id._text
  console.log(id == gomazo_id)
}).catch(err => {
  console.error(err)
})
