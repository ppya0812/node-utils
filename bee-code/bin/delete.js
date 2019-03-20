const inquirer = require('inquirer')
const path = require('path')
const chalk = require('chalk')
const shelljs = require('shelljs')
const { saveLock, readLock } = require('../utils/lock')

const appConfigDir = path.resolve(__dirname, '../apps/')
const appList = readLock() || {}
const list = Object.keys(appList) || []
const appname = process.argv[3]
const cmd = process.argv[2]

function execDeleteShell (name) {
  const scriptPath = path.resolve(appConfigDir, name, cmd + '.sh')
  shelljs.exec(`BASE=${appList[name].installDir} bash ${scriptPath}`, function (
    code,
    stdout,
    stderr
  ) {
    console.log(chalk.green(`耗时：${process.uptime()}s`))
    let lockObj = appList || {}
    const deleteAppName = lockObj[name]
    delete lockObj[name]
    saveLock(lockObj)
    console.log(chalk.yellow(`项目:${deleteAppName.installDir}删除成功`))
  })
}

function promptDelete (appname) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'current files will be clean, Do you sure to do that',
        name: 'delete'
      }
      // {
      //   type: 'confirm',
      //   message: 'cancel delete',
      //   name: 'cancel'
      //   // when: function (answers) {
      //   //   console.log('answers', )
      //   // return answers.delete
      //   // }
      // }
    ])
    .then(answers => {
      if (answers.delete) {
        execDeleteShell(appname)
      }
    })
}

module.exports = function () {
  if (!list || !list.length) {
    console.log(
      chalk.red(
        `还没有项目被bee-code安装，请先选择项目安装: bee-code install [appname]`
      )
    )
    process.exit(0)
  }
  const question = [
    {
      type: 'list',
      message: 'Select the git repository which you want to remove \n',
      default: {
        name: list[0]
      },
      name: 'appname',
      choices: [
        new inquirer.Separator('= exist app repository list = ')
      ].concat(list)
    }
  ]

  if (appname) {
    promptDelete(appname)
  } else {
    inquirer.prompt(question).then(answers => {
      promptDelete(answers.appname)
    })
  }
}
