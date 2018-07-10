const chalk = require('chalk')
const path = require('path')

const fs   = require('fs')

// 复制文件
const copyFile = (srcPath, tarPath, cb) => {
  let rs = fs.createReadStream(srcPath)
  rs.on('error', function(err) {
    if (err) {
      console.log(chalk.yellow('read error', srcPath))
    }
    cb && cb(err)
  })

  let ws = fs.createWriteStream(tarPath)
  ws.on('error', function(err) {
    if (err) {
      console.log(chalk.yellow('write error', tarPath))
    }
    cb && cb(err)
  })
  ws.on('close', function(ex) {
    cb && cb(ex)
  })
  rs.pipe(ws)
}

// 复制文件夹
const copyFolder = (srcDir, tarDir, cb) => {
  if (!fs.existsSync(tarDir)) {
    fs.mkdir('mkdir ' + tarDir)
  }
  fs.readdir(srcDir, (err, files) => {
    console.log(chalk.green('处理文件列表', files))
    let count = 0
    let checkEnd = () => {
      ++count == files.length && cb && cb()
    }

    if (err) {
      checkEnd()
      return
    }

    files.forEach(file => {
      let srcPath = path.join(srcDir, file)
      let tarPath = path.join(tarDir, file)
      fs.stat(srcPath, (err, stats) => {
        if (stats.isDirectory()) {
          console.log('mkdir', tarPath)
          fs.mkdir(tarPath, function(err) {
            if (err) {
              console.log(chalk.red('mkdir', err))
              return
            }
            copyFolder(srcPath, tarPath, checkEnd)
          })
        } else {
          copyFile(srcPath, tarPath, checkEnd)
        }
      })
    })
  })
}

module.exports = {
  copyFile,
  copyFolder
}
module.exports.default = module.exports
