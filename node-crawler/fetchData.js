const superagent = require('superagent')
const chalk = require('chalk')
const parseDom = require('./parseDom')
const fs = require('fs')
const mongoose = require('./mongoose')

function fetchDomData () {
  superagent
    .get(
      'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=1'
    )
    .end((err, res) => {
      if (err) {
        console.log(chalk.red(`信息抓取失败 - ${err}`))
        return
      }
      parseDom(res)
    })
}

function postData () {
  superagent
    .post('http://bravetime.davdian.com/index.php?c=Index&a=getCatNavList')
    .type('text/html; charset=utf-8')
    .set('Accept', 'application/json, text/javascript, */*; q=0.01')
    .end(function (err, res) {
      res.on('data', function (data) {
        console.log('11111')
      })
      if (err) {
        console.log('分类数据请求失败')
      } else {
        console.log('分类数据请求成功')
        let resData = res.text
        // resData = JSON.parse(resData)
        fs.writeFile('create.txt', resData, function (err) {
          if (err) throw err
          console.log('File Saved !') // 文件被保存
        })
      }
    })
}

module.exports = {
  fetchDomData,
  postData
}
