const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const shelljs = require('shelljs')
const { saveLock, readLock } = require('../utils/lock')

const appConfigDir = path.resolve(__dirname, '../apps/')
let list = fs.readdirSync(appConfigDir)
const appname = process.argv[3]
const cmd = process.argv[2]

function execShell (name) {
  const readLockFiles = readLock()
  if (!readLockFiles[name]) {
    const spinner = ora(`git clone  ${name}`).start()
    const pwd = shelljs.pwd().stdout
    const installDir = path.resolve(pwd, name)
    const scriptPath = path.resolve(appConfigDir, name, cmd + '.sh')
    shelljs.exec(`bash ${scriptPath}`, function (code, stdout, stderr) {
      spinner.succeed()
      console.log(chalk.green(`耗时：${process.uptime()}s`))
      let lockObj = readLockFiles
      lockObj[name] = {
        installDir: installDir
      }
      saveLock(lockObj)
    })
  } else {
    console.log(
      chalk.yellow(`项目已经安装在:${readLockFiles[name].installDir}`)
    )
  }
}

module.exports = function () {
  if (!list || !list.length) {
    console.log(
      chalk.red(
        `没有找到可用的app的配置，请检查bee-code仓库apps目录， 仓库地址：~~~~`
      )
    )
    process.exit(0)
  }
  const question = [
    {
      type: 'list',
      message: 'Select the git repository which you want to git clone \n',
      default: {
        name: list[0]
      },
      name: 'appname',
      choices: [
        new inquirer.Separator('= Available app repository list = ')
      ].concat(list)
    }
  ]

  if (appname) {
    execShell(appname)
  } else {
    inquirer.prompt(question).then(answers => {
      execShell(answers.appname)
    })
  }
}
