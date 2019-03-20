const fs = require('fs')
const path = require('path')
const { readLock } = require('../utils/lock')

const chalk = require('chalk')
const appConfigDir = path.resolve(__dirname, '../apps/')
let list = fs.readdirSync(appConfigDir)
module.exports = function () {
  const appList = readLock()
  console.log(
    chalk.cyan('app'.padStart(10, ' ')),
    chalk.cyan('status'.padStart(20, ' '))
  )
  list.forEach(name => {
    console.log(
      chalk.yellow(name.padStart(10, ' ')),
      (appList[name] ? appList[name].installDir : 'none').padStart(20, ' ')
    )
  })
}
