const cheerio = require('cheerio')

module.exports = function (res) {
  const $ = cheerio.load(res.text)
  let jobs = []
  const list = $('.hot_pos>li')
  console.log(list)
}
