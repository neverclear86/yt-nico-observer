const request = require('request');

var url = "http://api.search.nicovideo.jp/api/v2/live/contents/search"

var params = {
  q: "ごまぞぅ",
  targets: "title,description,tags",
  fields: "contentId,title,liveStatus",
  _sort: "-startTime",
  _context: "bot",
}


request.get({
  url: url,
  qs: params,
}, (err, req, body) => {
  console.log(body)
})
